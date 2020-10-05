import { Component, Input, OnInit } from '@angular/core';

export interface Crumb {
  label: string;
  path?: string | string[];
}

@Component({
  selector: 'sv-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() public crumbs: Crumb[] = [];
  @Input() public overrideBackFunction: string | string[];

  constructor() {}

  public ngOnInit(): void {}

  public get backPath(): string | string[] {
    return this.overrideBackFunction || this.crumbs[this.crumbs.length - 2]?.path || ['..'];
  }
}
