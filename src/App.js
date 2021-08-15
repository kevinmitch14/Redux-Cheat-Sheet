import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { addPerson, removePerson, clearAll } from './slices/peopleSlice';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { fetchApi } from './slices/peopleSlice';


const App = () => {

  const { people } = useSelector(state => state)
  const [userInput, setUserInput] = useState('')
  const [skip, setSkip] = useState(true)
  const [toggle, setToggle] = useState(true)

  const dispatch = useDispatch()

  const pokeData = fetchApi.useGetFetchQuery('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200.', { skip })
  const { data, error, isLoading } = fetchApi.useGetFetchQuery('https://jsonplaceholder.typicode.com/todos', { skip })

  const peopleList = people.peopleList.map((name) => {
    return (
      <p key={uuid()}> {name} <button onClick={() => dispatch(removePerson(name))}>X</button></p>
    )
  })

  const pokemonList = pokeData.data?.results.map((item) => {
    return (
      <div key={uuid()}>
        <p>{item.name}</p>
      </div>
    )
  })

  const todoList = data?.map((item) => {
    return (
      <div key={uuid()}>
        <p>{item.id} - {item.title} - {item.completed.toString()}</p>
      </div>
    )
  })

  return (
    <div className="App">
      <h1>Add or Remove a person from the List</h1>
      <h3>People Count {people.peopleList.length}</h3>


      <button onClick={() => { dispatch(addPerson(userInput)); setUserInput('') }}>
        <span>Add</span>
      </button>

      <input style={{ marginLeft: '10px', marginRight: "10px" }}
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}>
      </input>

      <button onClick={() => { dispatch(removePerson(userInput)); setUserInput('') }}>
        <span>Remove</span>
      </button>

      <button onClick={() => dispatch(clearAll())}>
        <span>Clear All</span>
      </button>


      <button onClick={() => setSkip(false)}>
        <span>Get API</span>
      </button>

      <button onClick={() => setToggle(!toggle)}>
        Toggle Data
      </button>

      {toggle ?
        <>
          <h1>Showing Todos</h1>
          {todoList}
        </> :
        <>
          <h1>Showing Pokemon</h1>
          {pokemonList}
        </>
      }

      {peopleList}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.error}</p>}
    </div >
  );
}

export default App;
