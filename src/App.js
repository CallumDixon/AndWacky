import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {

  const [state, setState] = useState(" ")
  
  return (
    <div>

    <h1>{state}</h1>
    <form>
      <input type="text" onChange={(data) => {
        console.log(data.target.value)
        setState(data.target.value)
      }} >

      </input>
    </form>
    </div>

  )
    
}

export default App;
