import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './apiConfig';


export const rtkClient = createApi({
  reducerPath: 'rtkClient',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set("Content-type", "application/json; charset=UTF-8")
      const accessToken = getState().auth.userData.token;
     
      if (accessToken) {
        console.log(accessToken);
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body: body,
      }),
    }),

    getLocationByClient: builder.query({
      query: (id: object)  => `location/${id?.client_id}`
    }),

    getAllClient: builder.query<'', void>({
      query: () => `client/all`
    }),

    getAllWorkOrder: builder.query<'', void>({
      query: () => `work_order/all`
    }),

    addWorkOrder: builder.mutation({
      query: (body) => ({
        url: 'work_order/add',
        method: 'POST',
        body: body,
      }),
    }),

    addTechnician: builder.mutation({
      query: (body) => ({
        url: 'work_order/technician/add',
        method: 'POST',
        body: body,
      }),
    }),

    addNote: builder.mutation({
      query: (body) => ({
        url: 'work_order/note/add',
        method: 'POST',
        body: body,
      }),
    }),

    getWorkOrderByID: builder.query({
      query: (id) => `work_order/by_id/${id}`
    }),

  }),

  
});



// Wrap the useGetLocationByClientQuery hook to log URL on error
export const useGetLocationByClientQueryWithLogging = (...args) => {
  const result = useGetLocationByClientQuery(...args);
  
  if (result.error) {
    console.error('Error fetching data:', result.error);
    console.log('URL:', result.error.config.url); // Log the URL being called
  }

  return result;
};


export const { 
  useLoginMutation, 
  useGetAllClientQuery, 
  useGetLocationByClientQuery, 
  useGetAllWorkOrderQuery,
  useAddWorkOrderMutation,
  useAddTechnicianMutation,
  useAddNoteMutation,
  useGetWorkOrderByIDQuery
} = rtkClient;
