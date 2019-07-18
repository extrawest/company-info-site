import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../../../interfaces/company.interface';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  searchIdentifier;
  company: Company;
  @Output() companyUpdated = new EventEmitter<Company>();

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.companyUpdated.emit(this.searchIdentifier);

    isNaN(this.searchIdentifier)
      ? this.router.navigate([`/search-list/${this.searchIdentifier}`])
      : this.router.navigate([
          `/company/${this.searchIdentifier.replace(/[^a-zA-Z0-9а-я]/g, '')}`
        ]);
  }
}
