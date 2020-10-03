import { Injectable } from '@angular/core';
import { Goal } from './goal.model';
import { GoalStore } from './goal.store';

@Injectable({ providedIn: 'root' })
export class GoalService {
  constructor(private goalStore: GoalStore) {}

  public add(goal: Goal): void {
    this.goalStore.add(goal);
  }

  public update(id: string, goal: Partial<Goal>): void {
    this.goalStore.update(id, goal);
  }

  public remove(id: string): void {
    this.goalStore.remove(id);
  }

  public upsert(id: string, goal: Partial<Goal>): void {
    this.goalStore.upsert(id, goal);
  }

  public deposit(id: string, amount: number): void {
    this.goalStore.update(id, (state) => ({
      ...state,
      saved: state.saved + amount,
    }));
  }

  public withdraw(id: string, amount: number): void {
    this.goalStore.update(id, (state) => ({
      ...state,
      saved: state.saved - amount,
    }));
  }
}
