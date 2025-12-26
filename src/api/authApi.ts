import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Login API (POST)
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['Auth'],
    }),
      logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        // ✅ Bearer token is automatically sent via baseQueryWithInterceptor
      }),
      // invalidatesTags: ['Auth'],
    }),
  }),
});

export const { 
  useLoginMutation, 
  useLogoutMutation 
} = authApi;
