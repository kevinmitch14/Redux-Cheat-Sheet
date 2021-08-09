import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { addPerson, removePerson, clearAll } from './slices/peopleSlice';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';


const App = () => {

  const { people } = useSelector(state => state)
  const [userInput, setUserInput] = useState('')
  const dispatch = useDispatch()

  const enterHandler = (e) => {
    if (e.keyCode === 13) {
      dispatch(addPerson(userInput))
      setUserInput("")
    }
  }

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
        onKeyDown={enterHandler}
        onChange={(e) => setUserInput(e.target.value)}>
      </input>

      <button onClick={() => { dispatch(removePerson(userInput)); setUserInput('') }}>
        <span>Remove</span>
      </button>

      <button onClick={() => dispatch(clearAll())}>
        <span>Clear All</span>
      </button>


      {
        people.peopleList.map((name) => {
          return (
            <p key={uuid()}> {name} <button onClick={() => dispatch(removePerson(name))}>X</button></p>
          )
        })
      }

    </div >
  );
}

export default App;
