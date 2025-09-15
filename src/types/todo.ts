// Todo Interface
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Filter constants
export const FILTER_ALL = "all" as const;
export const FILTER_ACTIVE = "active" as const;
export const FILTER_COMPLETED = "completed" as const;

// Filter type
export type Filter =
  | typeof FILTER_ALL
  | typeof FILTER_ACTIVE
  | typeof FILTER_COMPLETED;
