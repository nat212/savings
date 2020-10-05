import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { CollectionGuard } from 'akita-ng-fire';
import { Observable } from 'rxjs';
import { Goal } from './goal.model';
import { GoalService } from './goal.service';
import { GoalState } from './goal.store';

@Injectable({
  providedIn: 'root',
})
export class GoalGuard extends CollectionGuard<GoalState> {
  constructor(service: GoalService) {
    super(service);
  }

  public sync(): Observable<DocumentChangeAction<Goal>[]> {
    return (this.service as GoalService).sync();
  }
}
