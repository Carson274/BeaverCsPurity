import { useState } from 'react'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'
import Router, { Switch, Route } from 'crossroad';


const SCORE_STORAGE_KEY = 'beaverPurityScore'

function App() {
  const [score, setScoreState] = useState(() => {
    const stored = localStorage.getItem(SCORE_STORAGE_KEY)
    const parsed = stored === null ? NaN : Number(stored)
    return Number.isFinite(parsed) ? parsed : 100
  })
  const setScore = (next: number) => {
    setScoreState(next)
    localStorage.setItem(SCORE_STORAGE_KEY, String(next))
  }
  const Home = () => <HomePage setScore={setScore} />
  const Results = () => <ResultsPage score={score} />
  const NotFound = () => <NotFoundPage />

  return (
    <div className='app-div'>
      <Router>
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/results' component={Results} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
