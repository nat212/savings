import { getCurrencySymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsQuery } from 'src/app/settings/entities/settings/settings.query';
import { fabShowHide } from 'src/app/shared/animations/fab';
import { createGoal } from '../../stores/goal.model';
import { GoalQuery } from '../../stores/goal.query';
import { GoalService } from '../../stores/goal.service';

@Component({
  selector: 'sv-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss'],
  animations: [fabShowHide],
})
export class EditGoalComponent implements OnInit {
  public goalForm: FormGroup;
  public newGoal = false;
  public goalId: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private settingsQuery: SettingsQuery,
    private goalService: GoalService,
    private goalQuery: GoalQuery,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.goalForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
    });
    this.newGoal = !this.route.snapshot.paramMap.has('goal_id');
    this.goalId = this.route.snapshot.paramMap.get('goal_id');
    if (this.goalId) {
      this.goalQuery.getGoal(this.goalId).subscribe((goal) => {
        this.goalForm.patchValue({ ...goal });
      });
    }
  }

  get currencyCode(): string {
    return this.settingsQuery.getCurrency().code;
  }

  get currencySymbol(): string {
    return getCurrencySymbol(this.currencyCode, 'narrow');
  }

  public save(): void {
    const { name, amount } = this.goalForm.value;
    if (this.newGoal) {
      this.goalService.add(createGoal({ name, amount }));
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      this.goalService.update(this.goalId, { name, amount });
      this.router.navigate(['../..'], { relativeTo: this.route });
    }
  }
}
