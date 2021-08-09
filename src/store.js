import { configureStore } from '@reduxjs/toolkit'
import peopleSlice from './slices/peopleSlice'

export default configureStore({
    reducer: {
        people: peopleSlice
    }
})
