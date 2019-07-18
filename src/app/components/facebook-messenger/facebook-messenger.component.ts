import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';

import { FacebookService, InitParams } from 'ngx-facebook';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-facebook-messenger',
  templateUrl: './facebook-messenger.component.html',
  styleUrls: ['./facebook-messenger.component.scss']
})
export class FacebookMessengerComponent implements OnInit {
  constructor(
    private facebookService: FacebookService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.initFacebookService();
  }

  private initFacebookService(): void {
    if (isPlatformBrowser(this.platformId)) {
      let initParams: InitParams = {
        xfbml: true,
        version: 'v3.2'
      };
      this.facebookService.init(initParams);
    }
  }
}
