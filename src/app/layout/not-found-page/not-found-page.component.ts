import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit, OnDestroy {
  public searchDataText = '';
  private subscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchDataText = params[`identifier`];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
