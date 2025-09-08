import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import activitySlice from "./services/activitiesSlice"
import { setupListeners } from "@reduxjs/toolkit/query";



const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        activityReducer: activitySlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

export default store;