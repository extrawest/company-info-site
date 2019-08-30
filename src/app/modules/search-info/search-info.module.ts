import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInfoComponent } from './page/search-info/search-info.component';
import { SearchInfoRoutingModule } from './search-info-routing.module';
import { CoreModule } from '../core.module';
import { PoliticalPartyComponent } from '../../core/components/political-party/political-party.component';
import { CompanyComponent } from '../../core/components/company/company.component';
import { FopComponent } from '../../core/components/fop/fop.component';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ClipboardModule } from 'ngx-clipboard';
import { GoogleChartsModule } from 'angular-google-charts';
import { PrimengModule } from '../primeng.module';
import { FacebookModule } from 'ngx-facebook';

@NgModule({
    declarations: [SearchInfoComponent, PoliticalPartyComponent, CompanyComponent, FopComponent],
    imports: [
        CommonModule,
        SearchInfoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxJsonLdModule,
        ClipboardModule,
        GoogleChartsModule,
        PrimengModule,
        FacebookModule,
        CoreModule
    ]
})
export class SearchInfoModule {}
