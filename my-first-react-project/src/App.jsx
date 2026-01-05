import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card'
import Profile from './Profile'

function App() {
  return (
    <>
    <Card>
      <h1>REACT</h1>
      <p>A JS library</p>
      </Card> 

      <Card>
    <h1>HTML</h1>
    <p>The stucture of web pages</p>
    <p>Easy to learn</p>
      </Card>

      <Card>
        <h1>CSS</h1>
        <p>Used to style web pages</p>
      </Card>
  

    <Profile name="Sara" job="Student"></Profile>
    <Profile name="Sahil" job="Student"></Profile>
    <Profile name="Ahmad" job="Teacher"></Profile>
      <Profile name="Zohra" job="Trainer"></Profile>

    </>
  )
}

export default App
