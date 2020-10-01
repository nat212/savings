import { Component, Input, OnInit } from '@angular/core';

export interface Crumb {
  label: string;
  path?: string[];
}

@Component({
  selector: 'sv-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() public crumbs: Crumb[] = [];

  constructor() {}

  public ngOnInit(): void {}
}
