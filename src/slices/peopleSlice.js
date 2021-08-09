import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    peopleList: [],
}

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        addPerson: (state, action) => {
            state.peopleList = [...state.peopleList, action.payload]
        },
        removePerson: (state, action) => {
            state.peopleList = [...state.peopleList.filter(item => item.toUpperCase() !== action.payload.toUpperCase())];
        },
        clearAll: (state, action) => {
            state.peopleList = []
        }
    },
})

export const { addPerson, removePerson, clearAll } = peopleSlice.actions
export default peopleSlice.reducer