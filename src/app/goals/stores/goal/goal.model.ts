import { ID } from '@datorama/akita';

export interface Goal {
  id: ID;
}

export function createGoal(params: Partial<Goal>) {
  return {} as Goal;
}
