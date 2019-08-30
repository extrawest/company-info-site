import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { CompanyService } from './core/services/company.service';

import { FacebookMessengerComponent } from './shared/components/facebook-messenger/facebook-messenger.component';
import { FacebookModule } from 'ngx-facebook';
import { CoreModule } from './modules/core.module';
import { SearchInfoModule } from './modules/search-info/search-info.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { GoogleChartService } from './shared/services/google-chart.service';
import { FacebookSDKService } from './shared/services/facebook-sdk.service';

@NgModule({
  declarations: [AppComponent, FacebookMessengerComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'CompanyInfo' }),
    CoreModule,
    SearchInfoModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FacebookModule.forRoot(),
    GoogleChartsModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [CompanyService, GoogleChartService, FacebookSDKService],
  bootstrap: [AppComponent]
})
export class AppModule {}
