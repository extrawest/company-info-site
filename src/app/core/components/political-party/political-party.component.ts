import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SinglePage } from '../../../data/interfaces/single-page.interface';
import { CompanyService } from '../../services/company.service';
import { Tabs } from '../../../data/interfaces/tab.interface';
import { FacebookSDKService } from '../../../shared/services/facebook-sdk.service';

@Component({
  selector: 'app-political-party',
  templateUrl: './political-party.component.html',
  styleUrls: ['./political-party.component.scss']
})
export class PoliticalPartyComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  private schemaIdentifier: string;
  politicalParty: SinglePage;
  tabs: Tabs = [];
  identifier: string;
  showSpinner: boolean; //TODO redo
  schema;

  constructor(
    private _companyService: CompanyService,
    private _activatedRoute: ActivatedRoute,
    private _fbService: FacebookSDKService
  ) {
    this._activatedRoute.paramMap.subscribe((res: any) => {
      this.identifier = res.params.identifier.split('_')[0];
      this.schemaIdentifier = res.params.identifier;
    });
    this._getPoliticalParty();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _getPoliticalParty() {
    this._subscription = this._companyService
      .getPoliticalParty(this.identifier)
      .subscribe(
        (res: any) => {
          this.showSpinner = false;
          this.politicalParty = res;
          this._setTabs();
          this._setSchema();
        },
        error => {
          this._companyService.errorHandler(
            error,
            this.identifier
          );
        }
      );
    this._fbService.updateFacebookComments();
  }

  private _setTabs() {
    this.tabs = [
      {
        header: 'Дата реєстрації',
        body: this.politicalParty.record.regdate,
        class: 'company-info'
      },
      {
        header: 'Місцезнаходження реєстраційної справи',
        body: this.politicalParty.record.address,
        class: 'company-info company-info__owner-name'
      },
      {
        header: 'Ліцензия',
        body: this.politicalParty.record.license,
        class: 'company-info members-organization'
      },
      {
        header: 'Члени організації',
        body: this.politicalParty.record.governments,
        class: 'company-info members-organization'
      }
    ];
  }

  private _setSchema() {
    this.schema = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: `https://companyinfo.in.ua/politicalparty/${this.schemaIdentifier}`, //do url
      name: `${this.politicalParty.record.name}`,
      location: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${this.politicalParty.record.address}`
        }
      },
      foundingDate: {
        //check
        '@type': 'Date',
        foundingDate: `${this.politicalParty.record.regdate}`
      },
      legalName: `${this.politicalParty.record.name}`
    };
  }  
}
