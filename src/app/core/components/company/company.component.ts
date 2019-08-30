import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { CompanyService } from '../../services/company.service';
import { SinglePage } from '../../../data/interfaces/single-page.interface';
import { GoogleChartService } from '../../../shared/services/google-chart.service';
import { FacebookSDKService } from '../../../shared/services/facebook-sdk.service';
import { CompanyRecord } from './company-record';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
  identifier: string;
  showSpinner; // TODO
  isPolitic: boolean;
  politicName: string;
  companiesRecords = [];
  countOfVisibleFoundersInList: number;

  private _unsubscribe: Subject<void> = new Subject();
  private _organizations: [];

  constructor(
    private _companyService: CompanyService,
    private _activatedRoute: ActivatedRoute,
    private _clipboardService: ClipboardService,
    private _messageService: MessageService,
    private _googleChartsService: GoogleChartService,
    private _fbService: FacebookSDKService
  ) {}

  ngOnInit() {
    this._getCompanyInfo();
    this.countOfVisibleFoundersInList = 5;
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onCompanyUpdated(identifier) {
    if (this.identifier !== identifier) {
      this.identifier = identifier;
      this._companyService.searchData(identifier);
    }
  }

  copy(text: string) {
    this._clipboardService.copyFromContent(text);
    this._showCopyToast();
  }

  openGoogleMapsTab(address: string) {
    const addressWithoutSpaces = address.replace(/ /g, '+');
    const url = 'https://www.google.com/maps/search/?api=1&query='.concat(
      addressWithoutSpaces
    );
    window.open(url, '_blank');
  } 

  private _getCompanyInfo() {
     this._companyService.getData()
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(
        (res: any) => {
          if (res.orgs) {
            this.showSpinner = false;
            this._organizations = res.orgs.history;
            this.isPolitic = res.orgs.is_politic;
            this.politicName = res.orgs.name;
            this._getCompanyRecords();
          }
        } );
     this._fbService.updateFacebookComments();
  }

  private _getCompanyRecords() {
    this.companiesRecords = [];
    for (let i = 0; i < this._organizations.length; i++) {
      const organization = this._organizations[i] as SinglePage;
      const companyRecord = new CompanyRecord(
        i,
        organization,
        this._googleChartsService
      );
      this.companiesRecords.push(companyRecord);
    }
  }

  private _showCopyToast() {
    this._messageService.add({
      summary: '',
      closable: false,
      detail: 'Значення скопійовано',
      life: 800
    });
  }
}
