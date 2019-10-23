export interface ListQueryResponse<T> {
  next: string | null;
  previous: string | null;
  count: number;
  results: T[];
}
