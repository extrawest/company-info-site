import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { CompanyService } from './services/company.service';

import { FacebookMessengerComponent } from './components/facebook-messenger/facebook-messenger.component';
import { FacebookModule } from 'ngx-facebook';
import { CoreModule } from './components/core/core.module';
import { SearchInfoModule } from './components/search-info/search-info.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { MessageService } from 'primeng/api';
import { GoogleChartService } from './services/google-chart.service';

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
  providers: [CompanyService, MessageService, GoogleChartService],
  bootstrap: [AppComponent]
})
export class AppModule {}
