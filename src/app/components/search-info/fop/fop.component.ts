import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tabs } from '../../../interfaces/tab.interface';
import { SinglePage } from '../../../interfaces/single-page.interface';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fop',
  templateUrl: './fop.component.html',
  styleUrls: ['./fop.component.scss']
})
export class FopComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  private schemaIdentifier;
  fop: SinglePage;
  tabs: Tabs = [];
  identifier: string;
  showSpinner: boolean; //TODO redo
  schema;

  constructor(
    private _companyService: CompanyService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.paramMap.subscribe((res: any) => {
      this.identifier = res.params.identifier.split('_')[0];
      this.schemaIdentifier = res.params.identifier;
    });
    this.getFopInfo();
  }

  ngOnInit() {}

  private getFopInfo() {
    this._subscription = this._companyService
      .getFOPInfo(this.identifier)
      .subscribe(
        (res: any) => {
          this.showSpinner = false;
          this.fop = res;
          this.setTabs();
          this.setSchema();
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

  private setTabs() {
    this.tabs = [
      {
        header: 'Види діяльності',
        body: this.fop.record.kved,
        class: 'company-info activities'
      },
      {
        header: 'Місцезнаходження реєстраційної справи',
        body: this.fop.record.address,
        class: 'company-info company-info__owner-name'
      }
    ];
  }

  private setSchema() {
    this.schema = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: `https://companyinfo.in.ua/fop/${this.schemaIdentifier}`,
      founder: `${this.fop.record.fio}`,
      name: `${this.fop.record.fio}`,
      location: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${this.fop.record.address}`
        }
      },
      legalName: `${this.fop.record.fio}`
    };
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
