// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const bitfinexApi = createApi({
  reducerPath: 'bitfinexApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: builder => ({
    getListCurrencies: builder.query({
      query: () => `conf/pub:list:currency`,
    }),
    getListPairExchange: builder.query({
      query: () => `conf/pub:list:pair:exchange`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListCurrenciesQuery,
  useGetListPairExchangeQuery,
} = bitfinexApi;
