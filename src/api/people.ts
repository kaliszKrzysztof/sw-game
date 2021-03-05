import { getRequestUrl, performRequest } from 'helpers/request';
import { isDevelopment } from 'helpers/app';
import { ApiCollectionSuccessResponse, ApiErrorResponse } from 'types/api';
import { Person } from 'types/people';
import people from 'data/people';

type PeopleParams = {
  page: number;
};

export const getPeople = async (
  params: string | PeopleParams,
): Promise<[ApiErrorResponse, ApiCollectionSuccessResponse<Person>]> => {
  const requestParams =
    typeof params === 'string'
      ? params
      : getRequestUrl('people', { page: params.page });
  const request = performRequest<ApiCollectionSuccessResponse<Person>>(
    requestParams,
  );
  const { error, data } = await request;
  if (error) {
    return [error, null];
  }
  return [null, data];
};

export const getAllPeople = async (
  page = 1,
): Promise<[ApiErrorResponse, Person[]]> => {
  if (isDevelopment()) {
    return [null, people];
  }
  const [peopleError, peopleData] = await getPeople({ page });
  if (peopleError) {
    return [peopleError, []];
  }
  if (peopleData.next) {
    const [error, data] = await getAllPeople(page + 1);
    if (error) {
      return [error, []];
    }
    return [null, peopleData.results.concat(data)];
  }
  return [null, peopleData.results];
};
