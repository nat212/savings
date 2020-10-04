import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { Goal } from './goal.model';

export interface GoalState extends CollectionState<Goal> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'goal',
})
export class GoalStore extends EntityStore<GoalState> {
  constructor() {
    super();
  }
}
