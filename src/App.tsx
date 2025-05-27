import { useState } from 'react'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  const [score, setScore] = useState(100)

  return (
    <div className='app-div'>
      <HomePage score={score} setScore={setScore}/>
    </div>
  )
}

export default App
