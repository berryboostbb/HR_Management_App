import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // .......UPDATE USER.......

    updateUser: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/admin/updateAdmin/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),

    // .......UPLOAD FILE.......

    uploadFile: builder.mutation<any, { fileType: string; image: any }>({
      query: ({ fileType, image }) => {
        const formData = new FormData();
        formData.append('file', {
          uri: image?.path || image?.sourceURL || image?.uri, // <<< main fix
          type: image?.mime || 'image/jpeg',
          name: image?.filename || `image_${Date.now()}.jpg`,
        });

        return {
          url: `/upload/uploadFile?fileType=${fileType}`,
          method: 'POST',
          body: formData,
          // ✅ Do NOT set content-type manually
        };
      },
      invalidatesTags: ['User'],
    }),

    checkLocation: builder.mutation<any, { body: any }>({
      query: ({ body }) => ({
        url: '/attendance/checkin',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Status'],
    }),

    checkOut: builder.mutation<any, { body: any }>({
      query: ({ body }) => ({
        url: '/attendance/checkout',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Status'],
    }),

    startBreak: builder.mutation<any, { body: any }>({
      query: ({ body }) => ({
        url: '/attendance/startBreak',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Status'],
    }),

    endBreak: builder.mutation<any, { body: any }>({
      query: ({ body }) => ({
        url: '/attendance/endBreak',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Status'],
    }),

    getAttendanceStatus: builder.query<any[], void>({
      query: () => `/attendance/status`,
      providesTags: ['Status'],
    }),

    applyleve: builder.mutation<any, { body: any }>({
      query: ({ body }) => ({
        url: '/leave/apply',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Leaves'],
    }),
    getAllleaves: builder.query<any[], { id?: string }>({
      query: ({ id }) => `/leave/employee/${id}`,
      providesTags: ['Leaves'],
    }),
     getAllUsers: builder.query<any[], { id?: string }>({
      query: ({ id }) => `/auth/getAllUsers?search=${id}`,
      // providesTags: ['Leaves'],
    }),

     getAllAttendance: builder.query<any[], { id?: string,month?:string,year:string }>({
      query: ({ id,month,year }) => `/attendance/getAllAttendance?search=${id}&month=${month}&year=${year}`,
      // providesTags: ['Leaves'],
    }),

       getAllEvents: builder.query<any[], void>({
      query: () => `/events/getAllEvents`,
      // providesTags: ['Status'],
    }),
    getPayroll: builder.query({
      query: ({ id }) => `/payroll/employee/${id}`,
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUploadFileMutation,
  useCheckLocationMutation,
  useCheckOutMutation,
  useStartBreakMutation,
  useEndBreakMutation,
  useGetAttendanceStatusQuery,
  useApplyleveMutation,
  useGetAllleavesQuery,
  useGetAllUsersQuery,
  useGetAllAttendanceQuery,
  useGetAllEventsQuery,
  useGetPayrollQuery,
} = userApi;
