import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchInfoComponent } from './page/search-info/search-info.component';
import { PoliticalPartyComponent } from '../../core/components/political-party/political-party.component';
import { CompanyComponent } from '../../core/components/company/company.component';
import { FopComponent } from '../../core/components/fop/fop.component';

const routes: Routes = [
  {
    path: '',
    component: SearchInfoComponent
  },
  {
    path: 'politicalparty/:identifier',
    component: PoliticalPartyComponent
  },
  {
    path: 'company/:identifier',
    component: CompanyComponent
  },
  {
    path: 'fop/:identifier',
    component: FopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchInfoRoutingModule {}
