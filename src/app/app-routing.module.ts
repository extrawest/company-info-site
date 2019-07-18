import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundPageComponent } from './components/core/not-found-page/not-found-page.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/search-info/search-info.module').then(m => m.SearchInfoModule)
  },
  {
    path: '404',
    component: NotFoundPageComponent
  },
  {
    path: 'search-list/:identifier',
    loadChildren:
      () => import('./components/search-info/search-results/search-results.module').then(m => m.SearchResultsModule)
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
