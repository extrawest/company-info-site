import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../../../core/services/company.service';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.scss']
})
export class SearchInfoComponent {
  identifier;
  constructor(
      private _router: Router,
      private _companyService: CompanyService
  ) {}

  onSubmit() {
    this._companyService.searchData(this.identifier);
  }
}
