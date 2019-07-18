import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyService } from '../../../services/company.service';
import { SinglePage } from '../../../interfaces/single-page.interface';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { MessageService } from 'primeng/api';
import { GoogleChartService } from '../../../services/google-chart.service';
import { CompanyRecord } from './company-record';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {
  @Input() companyUpdated;
  identifier: string;
  showSpinner; // TODO
  isPolitic: boolean;
  politicName: string;
  companiesRecords = [];
  countOfVisibleFoundersInList: number;

  private _subscription: Subscription;
  private _organizations: [];

  constructor(
    private _companyService: CompanyService,
    private _activatedRoute: ActivatedRoute,
    private _clipboardService: ClipboardService,
    private _messageService: MessageService,
    private _googleChartsService: GoogleChartService
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((res: any) => {
      this.identifier = res.params.identifier;
    });
    this._getCompanyInfo();
    this.countOfVisibleFoundersInList = 5;
  }

  onCompanyUpdated(identifier) {
    this.identifier = identifier;
    this._getCompanyInfo();
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

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _getCompanyInfo() {
    this._subscription = this._companyService
      .getCompanyInfo(this.identifier)
      .subscribe(
        (res: any) => {
          this.showSpinner = false;
          this._organizations = res.orgs.history;
          this.isPolitic = res.orgs.is_politic;
          this.politicName = res.orgs.name;
          this._getCompanyRecords();
        },
        error => {
          this._companyService.errorHandler(
            error,
            this.showSpinner,
            this.identifier
          );
        }
      );
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
