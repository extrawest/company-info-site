import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CompanyService } from '../../../../core/services/company.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  // test = `ДЕГАС ЮРІЙ В'ЯЧЕСЛАВОВИЧ`;
  private searchList: any[] = [];
  private _unsubscribe: Subject<void> = new Subject();
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
    this._getSearchList();
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

  navigateDetails(card) {
    if (card.fio) {
      this.router.navigate([`/fop/${card.id}_${card.fio}`]);
    } else {
      this.router.navigate([`/company/${card.edrpou}`]);
    }
  }

  private _getSearchList() {
    this.showSpinner = true;
    this.companyService.getData()
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(
            (res: any) => {
              this.searchList = [...res.fops, ...res.organizations].sort((a, b) =>
                  a.status.localeCompare(b.status)
              );
              for (let item of this.searchList) {
                if (item.founders) item.founders = item.founders.join('\r\n');
                item.boss = item.boss || item.fio;
              }
              this.filteredList = this.searchList;
              this.showSpinner = false;
            }
        );
  } 
}
