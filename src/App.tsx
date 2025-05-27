import { useState } from 'react'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import './App.css'
import Router, { Switch, Route } from 'crossroad';


function App() {
  const [score, setScore] = useState(100)
  const Home = () => <HomePage setScore={setScore} />
  const Results = () => <ResultsPage score={score} />

  return (
    <div className='app-div'>
      <Router>
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/results' component={Results} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
