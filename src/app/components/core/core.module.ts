import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SearchInputComponent } from './search-input/search-input.component';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SinglePageOverviewComponent } from './single-page-overview/single-page-overview.component';

import { NgxJsonLdModule } from '@ngx-lite/json-ld';

@NgModule({
  declarations: [
    SearchInputComponent,
    NotFoundPageComponent,
    FooterComponent,
    HeaderComponent,
    SinglePageOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    ProgressSpinnerModule,
    NgxJsonLdModule
  ],
  exports: [SearchInputComponent, FooterComponent, HeaderComponent, SinglePageOverviewComponent]
})
export class CoreModule {}
