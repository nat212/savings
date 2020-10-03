import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { fabShowHide } from 'src/app/shared/animations/fab';
import { Crumb } from 'src/app/shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'sv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fabShowHide],
})
export class HomeComponent implements OnInit {
  private selectedIndex$: Subject<number>;
  public crumbs$: Observable<Crumb[]>;
  public showFAB$: Observable<boolean>;
  constructor(private router: Router, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.selectedIndex$ = new Subject();
    const urlIsGoalsHome = (url: string) => !!url.match(/(home:goals\/\/)|(home:goals\))/);
    const isAtGoalsHome$: Observable<boolean> = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      map(urlIsGoalsHome),
    );
    this.showFAB$ = combineLatest([
      isAtGoalsHome$.pipe(startWith(urlIsGoalsHome(this.router.url))),
      this.selectedIndex$.pipe(startWith(0)),
    ]).pipe(map(([goalsHome, selectedTab]) => goalsHome && selectedTab === 0));
    this.crumbs$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      map((url) => this.route.children.find((c) => c.snapshot.url.join('/') === url)),
      map((route: ActivatedRoute) => route?.snapshot.data.crumbs),
    );
  }

  public selectedIndexChange(index: number): void {
    this.selectedIndex$.next(index);
  }

  public addGoal(): void {
    this.router.navigate([{ outlets: { home: 'goals/edit' } }], { relativeTo: this.route });
  }
}
