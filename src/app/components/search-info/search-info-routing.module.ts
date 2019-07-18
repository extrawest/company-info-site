import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchInfoComponent } from './search-info.component';
import { PoliticalPartyComponent } from './political-party/political-party.component';
import { CompanyComponent } from './company/company.component';
import { FopComponent } from './fop/fop.component';

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
