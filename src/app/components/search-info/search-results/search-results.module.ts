import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsComponent } from '../../search-info/search-results/search-results.component';
import { SearchResultsRoutingModule } from './search-results-routing.module';

import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CoreModule } from '../../core/core.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    PaginatorModule,
    DropdownModule,
    TableModule,
    PanelModule,
    CoreModule,
    ProgressSpinnerModule
  ]
})
export class SearchResultsModule {}
