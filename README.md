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

#

### Async Redux using Redux ToolKit

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fetchApi = createApi({
    reducerPath: 'fetchingData',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({
        getFetch: builder.query({
            query: (input) => `${input}`,
        }),
    }),
})

export const { useGetFetchQuery } = fetchApi

```

### App.js

import `fetchApi` from the slice    
`fetchApi.useGetQuery` is called automatically, to stop this we can use a boolean 'skip'.    
When `skip` is `true` it is not automatically called.    
When `skip` changes to false the fetch is made.    

```js
import { fetchApi } from './slices/peopleSlice';

const App = () => {
  const [skip, setSkip] = useState(true)
  const { data, error, isLoading } = fetchApi.useGetFetchQuery('https://jsonplaceholder.typicode.com/todos', { skip }) 
  
  <button onClick={() => setSkip(false)}>
    Start Fetch!
  </button>
}

```

### store.js

```js 
import { fetchApi } from './slices/peopleSlice'

export default configureStore({
    reducer: {
        people: peopleSlice,
        [fetchApi.reducerPath]: fetchApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchApi.middleware),
})
```
