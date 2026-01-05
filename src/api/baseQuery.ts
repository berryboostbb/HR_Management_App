import NetInfo from "@react-native-community/netinfo";
import {
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { logout, RootState } from '@redux';
import { Alert } from '@utils';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://hr-management-backend-85d6dc3117a3.herokuapp.com/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.user?.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    headers.set('Accept', 'application/json');
    return headers;
  },
});

export const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  // ✅ Internet Check Before API call
  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    Alert.showError("No Internet Connection");
    return { error: { status: "NETWORK_ERROR", message: "No Internet" } };
  }

  let result: any = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 400) {
    Alert.showError(result?.error?.data?.message || 'Bad request');
  }

  if (result?.error?.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.user?.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      Alert.showError('You have been logged out. Please login again.');
    }
  }

  return result;
};
