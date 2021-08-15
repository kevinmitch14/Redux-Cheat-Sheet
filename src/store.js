import { configureStore } from '@reduxjs/toolkit'
import peopleSlice from './slices/peopleSlice'
import { fetchApi } from './slices/peopleSlice'


export default configureStore({
    reducer: {
        people: peopleSlice,
        [fetchApi.reducerPath]: fetchApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchApi.middleware),
})
