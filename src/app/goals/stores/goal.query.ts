import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Goal } from './goal.model';
import { GoalState, GoalStore } from './goal.store';

@Injectable({ providedIn: 'root' })
export class GoalQuery extends QueryEntity<GoalState> {
  public goals$ = this.selectAll();

  constructor(protected store: GoalStore) {
    super(store);
  }

  public getGoal(id: string): Observable<Goal> {
    return this.selectEntity(id);
  }
}
