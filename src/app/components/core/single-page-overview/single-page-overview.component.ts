import { Component, OnInit, Input } from '@angular/core';
import { SinglePage } from '../../../interfaces/single-page.interface';
import { Tabs } from '../../../interfaces/tab.interface';

@Component({
  selector: 'app-single-page-overview',
  templateUrl: './single-page-overview.component.html',
  styleUrls: ['./single-page-overview.component.scss']
})
export class SinglePageOverviewComponent implements OnInit {
  @Input() data: SinglePage;
  @Input() tabs: Tabs;
  @Input() schema;

  constructor() {}

  ngOnInit() {}
}
