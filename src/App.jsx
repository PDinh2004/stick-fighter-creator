import { useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import CreateCharacter from './pages/CreateCharacter'
import './App.css'

function App() {

  return (
    <div className='App'>
      <div className='header'>
        <img src="https://static.wikia.nocookie.net/animatorvsanimation/images/7/78/FightingStickFigures.png" width={"80%"} style={{}}/>
        <h1>Stick Fighter Creator</h1>
        <Link
          style={{color: "white"}}
          to={'/new'}
        >
          <h2 style={{backgroundColor: "grey"}}>Create Fighter ✍️</h2>
        </Link>
      
        <Link
          style={{color: "white"}}
          to={'/gallery'}
        >
          <h2 style={{backgroundColor: "grey"}}>Fighter Gallery 🤼‍♂️</h2>
        </Link>
      </div>
    </div>
  )
}

export default App
