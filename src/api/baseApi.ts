import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from './baseQuery';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: [
    'Auth',
    'User',
    'CheckIn',
    "Leaves"
  ],
  endpoints: () => ({}),
});
