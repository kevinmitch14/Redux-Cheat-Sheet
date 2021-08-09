# Redux Cheat Sheet

### Provide the store to the app.

Wrap App in `<Provider>` and pass `store` to the `<Provider>`

```js
<Provider store={store}>
  <App>
</Provider>
```

#

### Create the store

Create `store.js` file to initialise the store.

```js
export default configureStore({
  reducer: {
    eg. navBar: navBarReducer
  }
})
```

#

### Create a Redux State Slice

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeCategories: [],
}

export const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    removeFilter: (state, action) => {
     state.value = [...state.value.filter(items => (item) != action.payload)
    },
    clearFilters: (state, action) => {
      state.value = []
    },
  },
})

export const { addFilter, removeFilter, clearFilters } = navBarSlice.actions

export default navBarSlice.reducer
```

#

### Add this slice to the store

```js
import navBarReducer from "../slices/navBarSlice";

export default configureStore({
  reducer: {
    navBar: navBarReducer,
  },
});
```

#

### Use data or dispatch actions

```js
import { useSelector, useDispatch } from 'react-redux'
import {addFilter, removeFilter, clearFilters} from '../slices/navBarSlice'


const state = useSelector(state => state.navBar)

<button onClick={() => dispatch(addFilter("Size Large"))}>


```
