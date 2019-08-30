import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './page/search-result/search-results.component';
import { SearchResultsRoutingModule } from './search-results-routing.module';
import { PrimengModule } from '../primeng.module';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    CoreModule,
    PrimengModule
  ]
})
export class SearchResultsModule {}
