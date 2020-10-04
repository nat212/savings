export interface Goal {
  id: string;
  amount: number;
  name: string;
  saved: number;
}

export function createGoal(params: Partial<Goal>): Goal {
  return {
    saved: 0,
    ...params,
  } as Goal;
}
