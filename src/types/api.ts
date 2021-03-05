export type ApiCollectionSuccessResponse<T> = {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
};

export type ApiErrorResponse = {
  status: number;
  message: string;
};
