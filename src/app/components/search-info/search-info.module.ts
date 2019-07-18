import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SearchInfoComponent } from './search-info.component';
import { SearchInfoRoutingModule } from './search-info-routing.module';
import { CoreModule } from '../core/core.module';
import { PoliticalPartyComponent } from './political-party/political-party.component';
import { CompanyComponent } from './company/company.component';
import { FopComponent } from './fop/fop.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {ClipboardModule} from 'ngx-clipboard';
import {ToastModule} from 'primeng/toast';
import {GoogleChartsModule} from 'angular-google-charts';

@NgModule({
  declarations: [SearchInfoComponent, PoliticalPartyComponent, CompanyComponent, FopComponent],
    imports: [
        CommonModule,
        SearchInfoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CoreModule,
        ProgressSpinnerModule,
        NgxJsonLdModule,
        ClipboardModule,
        ToastModule,
        GoogleChartsModule
    ]
})
export class SearchInfoModule {}
