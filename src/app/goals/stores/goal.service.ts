import { Injectable } from '@angular/core';
import { Goal } from './goal.model';
import { GoalStore } from './goal.store';

@Injectable({ providedIn: 'root' })
export class GoalService {
  constructor(private goalStore: GoalStore) {}

  public add(goal: Goal): void {
    this.goalStore.add(goal);
  }

  public update(id: number, goal: Partial<Goal>): void {
    this.goalStore.update(id, goal);
  }

  public remove(id: number): void {
    this.goalStore.remove(id);
  }

  public upsert(id: number, goal: Partial<Goal>): void {
    this.goalStore.upsert(id, goal);
  }
}
