import * as uuid from 'uuid';
export interface Goal {
  id: string;
  amount: number;
  name: string;
  saved: number;
}

export function createGoal(params: Partial<Goal>): Goal {
  return {
    id: uuid.v4(),
    saved: 0,
    ...params,
  } as Goal;
}
