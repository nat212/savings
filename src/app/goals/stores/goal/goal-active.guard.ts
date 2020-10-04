import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CollectionGuard } from 'akita-ng-fire';
import { Observable } from 'rxjs';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';
import { GoalState } from './goal.store';

@Injectable({
  providedIn: 'root',
})
export class GoalActiveGuard extends CollectionGuard<GoalState> {
  constructor(service: GoalService) {
    super(service);
  }

  public sync(next: ActivatedRouteSnapshot): Observable<Goal> {
    return this.service.syncActive({ id: next.params.goal_id });
  }
}
