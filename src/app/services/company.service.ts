import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Company } from '../interfaces/company.interface';
import { Fop } from '../interfaces/fop.interface';
import { PoliticalParty } from '../interfaces/political-party.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient, private _router: Router) {}

  getCompanyInfo(edrpou: string) {
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

  errorHandler(error, spinner, identifier) {
    if (error instanceof HttpErrorResponse) {
      this._router.navigate([`/404`], {
        queryParams: { identifier }
      });
      spinner = false;
    }
  }
}
