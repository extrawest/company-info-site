import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { SearchInputComponent } from '../core/components/search-input/search-input.component';
import { NotFoundPageComponent } from '../layout/not-found-page/not-found-page.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { SinglePageOverviewComponent } from '../layout/single-page-overview/single-page-overview.component';
import { FacebookCommentsComponent } from '../shared/components/facebook-comments/facebook-comments.component';
import { PrimengModule} from './primeng.module';
import { FacebookModule } from 'ngx-facebook';

@NgModule({
  declarations: [
    SearchInputComponent,
    NotFoundPageComponent,
    FooterComponent,
    HeaderComponent,
    SinglePageOverviewComponent,
    FacebookCommentsComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NgxJsonLdModule,
        PrimengModule,
        FacebookModule
    ],
  exports: [SearchInputComponent, FooterComponent, HeaderComponent, PrimengModule, SinglePageOverviewComponent, FacebookCommentsComponent]
})
export class CoreModule {}
