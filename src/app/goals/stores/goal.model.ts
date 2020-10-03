export interface Goal {
  id: number | string;
  amount: number;
  name: string;
}

export function createGoal(params: Partial<Goal>): Goal {
  return {
    ...params,
  } as Goal;
}
