import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FacebookService, InitParams } from 'ngx-facebook';

@Injectable({
    providedIn: 'root'
})
export class FacebookSDKService implements OnInit {

    constructor(
        private facebookService: FacebookService,
        @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit(): void {
        this._initFacebookService();
    }

    updateFacebookComments() {
        // Fix for Facebook SDK bug
        const currentUrl = window.location.href;
        if ( document.getElementById('fb-comments')) {
            document.getElementById('fb-comments').setAttribute('data-href', currentUrl);
            (window as any).FB.XFBML.parse();
        }
    }

    private _initFacebookService(): void {
        if (isPlatformBrowser(this.platformId)) {
            let initParams: InitParams = {
                xfbml: true,
                version: 'v3.2'
            };
            this.facebookService.init(initParams);
        }
    }
    
}
