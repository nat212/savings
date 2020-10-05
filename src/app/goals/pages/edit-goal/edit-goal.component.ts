import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createGoal, Goal, GoalQuery, GoalService } from '@goals/stores/goal/index';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthQuery } from 'src/app/auth/stores/auth';
import { fabShowHide } from 'src/app/shared/animations/fab';
import { Crumb } from 'src/app/shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'sv-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss'],
  animations: [fabShowHide],
})
export class EditGoalComponent implements OnInit {
  public goalForm: FormGroup;
  public goal$: Observable<Goal>;
  public crumbs$: Observable<Crumb[]>;
  private goalId: string;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: AuthQuery,
    private goalService: GoalService,
    private goalQuery: GoalQuery,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.goalForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
    });
    this.goal$ = this.route.params.pipe(
      switchMap(({ goal_id }) => this.goalQuery.selectEntity(goal_id)),
      takeUntil(this.unsubscribe$),
    );
    this.goal$.subscribe((goal) => {
      this.goalForm.patchValue({ ...(goal || {}) });
      this.goalId = goal?.id;
    });
    this.crumbs$ = this.goal$.pipe(
      map((goal) =>
        goal ? [{ label: 'Goals', path: ['../..'] }, { label: `Edit Goal: ${goal.name}` }] : [{ label: 'Goals' }, { label: 'Add Goal' }],
      ),
    );
  }

  get currencyCode$(): Observable<string> {
    return this.user.currency$.pipe(map(({ code }) => code));
  }

  public save(): void {
    const { name, amount } = this.goalForm.value;
    if (this.goalId) {
      this.goalService.update(this.goalId, { name, amount });
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      this.goalService.add(createGoal({ name, amount }));
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }
}
