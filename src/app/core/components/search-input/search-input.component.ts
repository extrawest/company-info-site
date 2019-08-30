import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from '../../../data/interfaces/company.interface';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  searchIdentifier;
  company: Company;
  @Output() companyUpdated = new EventEmitter<Company>();

  private _subscriptions: Subscription[] = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _companyService: CompanyService
  ) {}

  ngOnInit() {
    this._subscriptions.push(
      this._activatedRoute.paramMap.subscribe((res: any) => {
        if (res.params.identifier) {
          this.searchIdentifier = res.params.identifier.split('_')[0];
          this.companyUpdated.emit(this.searchIdentifier);
        }
      })
    );

    this._subscriptions.push(
      this._activatedRoute.queryParams.subscribe(params => {
        this.searchIdentifier = params[`identifier`];
      })
    );
  }

  onSubmit() {
    this._companyService.searchData(this.searchIdentifier);
  }

  ngOnDestroy() {
    for (const sub of this._subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }
}
