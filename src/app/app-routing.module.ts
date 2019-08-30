import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundPageComponent } from './layout/not-found-page/not-found-page.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/search-info/search-info.module').then(m => m.SearchInfoModule)
  },
  {
    path: '404',
    component: NotFoundPageComponent
  },
  {
    path: 'search-list/:identifier',
    loadChildren:
      () => import('./modules/search-results/search-results.module').then(m => m.SearchResultsModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
