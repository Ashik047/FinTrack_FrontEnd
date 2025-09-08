import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fintrack-backend-e20c.onrender.com' }),
    tagTypes: ['Money'],
    endpoints: (builder) => ({
        getActivities: builder.query({
            query: () => '/activities',
            transformResponse: res => res.sort((a, b) => new Date(b.date) - new Date(a.date)),
            providesTags: (result) =>
                result
                    ? [
                        { type: 'Money', id: 'LIST' },
                        ...result.map(({ id }) => ({ type: 'Money', id })),
                    ]
                    : [{ type: 'Money', id: 'LIST' }],
        }),
        addActivity: builder.mutation({
            query: (activity) => ({
                url: '/activities',
                method: 'POST',
                body: activity
            }),
            invalidatesTags: [{ type: 'Money', id: "LIST" }]
        }),
        updateActivity: builder.mutation({
            query: (activity) => ({
                url: `/activities/${activity.id}`,
                method: 'PUT',
                body: activity
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Money", id }]
        }),
        deleteActivity: builder.mutation({
            query: ({ id }) => ({
                url: `/activities/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Money", id },
                { type: "Money", id: "LIST" },
            ]
        }),
    })
})

export const {
    useGetActivitiesQuery,
    useAddActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation
} = apiSlice