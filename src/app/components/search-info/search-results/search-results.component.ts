import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../../../services/company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  // test = `ДЕГАС ЮРІЙ В'ЯЧЕСЛАВОВИЧ`;
  private searchList: any[] = [];

  showSpinner: boolean = true;
  identifier: string;
  filterBy = 'all';
  filteredList: any[] = [];
  cards: any[] = [];
  filterButtonsList: any[];

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.filterButtonsList = [
      { name: 'Всi', value: 'all' },
      { name: 'Власники', value: 'boss' },
      { name: 'Керiвники', value: 'founders' }
    ];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((res: any) => {
      this.identifier = res.params.identifier.toUpperCase();
      this.getSearchList(res.params.identifier);
    });
  }

  dataFilter(filterBy: string) {
    this.filterBy = filterBy;
    if (filterBy === 'all') {
      this.filteredList = this.searchList;
    } else {
      this.filteredList = this.searchList.filter((item: any) => {
        if (filterBy === 'boss') {
          return item.boss.includes(this.identifier);
        } else if (item.founders && filterBy === 'founders') {
          return item.founders.includes(this.identifier);
        }
      });
    }
  }

  private getSearchList(identifier: string) {
    this.showSpinner = true;
    this.companyService.getSearchList(identifier).subscribe(
      (res: any) => {
        this.searchList = [...res.fops, ...res.organizations].sort((a, b) =>
          a.status.localeCompare(b.status)
        );
        for (let item of this.searchList) {
          if (item.founders) item.founders = item.founders.join('\r\n');
          item.boss = item.boss || item.fio;
        }

        this.filteredList = this.searchList;

        if (!this.searchList.length) {
          this.router.navigate([`/404`], {
            queryParams: { identifier }
          });
        }

        this.showSpinner = false;
      },
      (error: any) => {
        this.companyService.errorHandler(
          error,
          this.showSpinner,
          identifier
        );
      }
    );
  }

  navigateDetails(card) {
    if (card.fio) {
      this.router.navigate([`/fop/${card.id}_${card.fio}`]);
    } else {
      this.router.navigate([`/company/${card.edrpou}`]);
    }
  }
}
