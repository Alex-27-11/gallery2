import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ServerResponse,
  ServerResponseLoc,
  ServerResponseAuthor,
} from "../../models/models";

export const paintingsApi = createApi({
  reducerPath: "paintings/Api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    allPaintings: build.query<
      { apiResponse: ServerResponse[]; totalCount: number },
      number
    >({
      query: (num: number) => ({
        url: `/paintings`,
        params: {
          _limit: 12,
          _page: num,
        },
      }),
      transformResponse: (
        apiResponse: ServerResponse[],
        meta: { request: Request; response?: Response }
      ) => {
        return {
          apiResponse,
          totalCount: Number(meta?.response!.headers.get("X-Total-Count")),
        };
      },
    }),
    allAuthors: build.query<ServerResponseAuthor[], string>({
      query: () => `/authors`,
    }),
    allLocations: build.query<ServerResponseLoc[], string>({
      query: () => `/locations`,
    }),
    searchNames: build.query<ServerResponse[], { page?: number; name: string }>(
      {
        query: ({ page = 1, name }) => ({
          url: `/paintings`,
          params: {
            _limit: 12,
            _page: page,
            name: name,
          },
        }),
      }
    ),
    sortAuthors: build.query<ServerResponse[], { page?: number; id: number }>({
      query: ({ page = 1, id }) => ({
        url: `/paintings`,
        params: {
          _limit: 12,
          _page: page,
          authorId: id,
        },
      }),
    }),
    sortLocations: build.query<ServerResponse[], { page?: number; id: number }>(
      {
        query: ({ page = 1, id }) => ({
          url: `/paintings`,
          params: {
            _limit: 12,
            _page: page,
            locationId: id,
          },
        }),
      }
    ),
    sortYears: build.query<
      ServerResponse[],
      { page?: number; from: string; to: string }
    >({
      query: ({ page, from, to }) => ({
        url: `/paintings`,
        params: {
          _limit: 12,
          _page: page,
          created_gte: from,
          created_lte: to,
        },
      }),
    }),
  }),
});

export const {
  useAllPaintingsQuery,
  useAllAuthorsQuery,
  useAllLocationsQuery,
  useLazySortAuthorsQuery,
  useLazySortLocationsQuery,
  useLazySortYearsQuery,
  useLazySearchNamesQuery,
} = paintingsApi;
