import { isDevelopment } from 'helpers/app';
import { getRequestUrl, performRequest } from 'helpers/request';
import { ApiCollectionSuccessResponse, ApiErrorResponse } from 'types/api';
import { Starship } from 'types/starships';
import starships from 'data/starships';

type StarshipsParams = {
  page: number;
};

export const getStarships = async (
  params: string | StarshipsParams,
): Promise<[ApiErrorResponse, ApiCollectionSuccessResponse<Starship>]> => {
  const requestParams =
    typeof params === 'string'
      ? params
      : getRequestUrl('starships', {
          page: params.page,
        });
  const request = performRequest<ApiCollectionSuccessResponse<Starship>>(
    requestParams,
  );
  const { error, data } = await request;
  if (error) {
    return [error, null];
  }
  return [null, data];
};

export const getAllStarships = async (
  page = 1,
): Promise<[ApiErrorResponse, Starship[]]> => {
  if (isDevelopment()) {
    return [null, starships];
  }
  const [starshipsError, starshipsData] = await getStarships({ page });
  if (starshipsError) {
    return [starshipsError, []];
  }
  if (starshipsData.next) {
    const [error, data] = await getAllStarships(page + 1);
    if (error) {
      return [error, []];
    }
    return [null, starshipsData.results.concat(data)];
  }
  return [null, starshipsData.results];
};
