import { getCurrencySymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from 'src/app/settings/services/settings.service';
import { fabShowHide } from 'src/app/shared/animations/fab';

@Component({
  selector: 'sv-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss'],
  animations: [fabShowHide],
})
export class EditGoalComponent implements OnInit {
  public goalForm: FormGroup;
  public newGoal = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private settings: SettingsService,
  ) {}

  public ngOnInit(): void {
    this.goalForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
    });
    this.newGoal = !this.route.snapshot.paramMap.has('goal_id');
  }

  get currencyCode(): string {
    return this.settings.getCurrency().code;
  }

  get currencySymbol(): string {
    return getCurrencySymbol(this.currencyCode, 'narrow');
  }
}
