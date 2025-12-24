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


  }),
});

export const {
  useUpdateUserMutation,
  useUploadFileMutation,
} = userApi;
