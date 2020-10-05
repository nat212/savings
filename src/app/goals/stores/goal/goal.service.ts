import { Injectable } from '@angular/core';
import { DocumentChangeAction, QueryFn } from '@angular/fire/firestore';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthQuery } from 'src/app/auth/stores/auth';
import { Goal } from './goal.model';
import { GoalState, GoalStore } from './goal.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users/:userId/goals' })
export class GoalService extends CollectionService<GoalState> {
  constructor(store: GoalStore, private auth: AuthQuery) {
    super(store);
  }

  public sync(queryFn?: QueryFn): Observable<DocumentChangeAction<Goal>[]> {
    return this.auth.userId$.pipe(
      tap(() => this.store.reset()),
      switchMap((userId) => this.syncCollection(queryFn, { params: { userId } })),
    );
  }

  public deposit(id: string, amount: number): void {
    this.update(id, (entity) => ({ saved: entity.saved + amount }));
  }

  public withdraw(id: string, amount: number): void {
    this.update(id, (entity) => ({ saved: entity.saved - amount }));
  }
}
