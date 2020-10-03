import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { fabShowHide } from 'src/app/shared/animations/fab';
import { Goal } from '../../stores/goal.model';
import { GoalQuery } from '../../stores/goal.query';

@Component({
  selector: 'sv-goals-home',
  templateUrl: './goals-home.component.html',
  styleUrls: ['./goals-home.component.scss'],
  animations: [fabShowHide],
})
export class GoalsHomeComponent implements OnInit {
  public goals$: Observable<Goal[]>;
  constructor(private goalQuery: GoalQuery) {}

  public ngOnInit(): void {
    this.goals$ = this.goalQuery.goals$;
  }
}
