// src/shared/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Item { id: number; name: string }

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (build) => ({
        getItems: build.query<Item[], void>({ query: () => 'items' }),
    }),
});

export const { useGetItemsQuery } = apiSlice;
