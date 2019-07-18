import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.scss']
})
export class SearchInfoComponent {
  identifier;
  constructor(private router: Router) {}

  onSubmit() {
    this.identifier.match(/\d+/g)
      ? this.router.navigate([
          `/company/${this.identifier.replace(/[^a-zA-Z0-9а-я]/g, '')}`
        ])
      : this.router.navigate([`/search-list/${this.identifier.trim()}`]);
  }
}
