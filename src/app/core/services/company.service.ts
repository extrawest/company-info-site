import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Company } from '../../data/interfaces/company.interface';
import { Fop } from '../../data/interfaces/fop.interface';
import { PoliticalParty } from '../../data/interfaces/political-party.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService implements OnDestroy {
  private _data: BehaviorSubject<any>;
  private _subscription: Subject<void> = new Subject();

  constructor(private http: HttpClient, private _router: Router) {
    this._data = new BehaviorSubject({});
  }

  setData(data: any) {
    this._data.next(data);
  }

  getData() {
    return this._data;
  }

  searchData(identifier) {
   if (identifier) {
      (identifier.match(/\d+/g)) ? this._searchCompanyInfo(identifier) : this._searchInSearchList(identifier);
   }
  }

  private getCompanyInfo(edrpou: string) {
    return this.http.get<Company>(`${environment.apiUrl}/org?edrpou=${edrpou}`);
  }

  getFOPInfo(fopId: string) {
    return this.http.get<Fop>(`${environment.apiUrl}/fop?id=${fopId}`);
  }

  getSearchList(name: string) {
    return this.http.get(`${environment.apiUrl}/search?fio=${name}`);
  }

  getPoliticalParty(edrpou: string) {
    return this.http.get<PoliticalParty>(`${environment.apiUrl}/politic?edrpou=${edrpou}`);
  }

  errorHandler(error, identifier) {
    if (error instanceof HttpErrorResponse) {
      this._navigateToErrorPage(identifier);
    }
  }

  ngOnDestroy() {
    this._subscription.next();
    this._subscription.complete();
    this._data.unsubscribe();
  }

  private _navigateToErrorPage(identifier) {
    this._router.navigate([`/404`], {
      queryParams: { identifier }
    });
  }

  private _searchCompanyInfo(identifier) {
    this.getCompanyInfo(identifier)
        .pipe(takeUntil(this._subscription))
        .subscribe(
            (res: any) => {
              this.setData(res);
              this._router.navigate([
                `/company/${identifier.replace(/[^a-zA-Z0-9а-я]/g, '')}`
              ]);
            },
            error => {
              this.errorHandler(
                  error,
                  identifier
              );
            }
        );
  }

  private _searchInSearchList(identifier) {
    this.getSearchList(identifier)
        .pipe(takeUntil(this._subscription))
        .subscribe(
            (res: any) => {
              this.setData(res);
              const searchList = [...res.fops, ...res.organizations];
              if (searchList.length) {
               this._router.navigate([`/search-list/${identifier.trim()}`]);
              } else {
               this._navigateToErrorPage(identifier);
              }
            },
            (error: any) => {
              this.errorHandler(
                  error,
                  identifier
              );
            }
        );
  }
}
