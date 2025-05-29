import Footer from '../components/Footer'
import type { MessageItem } from '../types'

export default function ResultsPage({ score }: { score: number }) {
  const messages: MessageItem[] = [
    { floor: 100, text: "Not a single one? Are you sure you're a CS major?" },
    { floor: 90, text: "You must either be a freshman or have a social life. Congrats! Goodluck finding a j*b though." },
    { floor: 80, text: "You're still mostly pure. Still time to fall." },
    { floor: 70, text: "You've seen some stuff." },
    { floor: 69, text: "Nice." },
    { floor: 60, text: "You’ve begun the descent into chaos." },
    { floor: 50, text: "You’re halfway to morally bankrupt." },
    { floor: 40, text: "Things are getting concerning." },
    { floor: 30, text: "Are you okay?" },
    { floor: 20, text: "Okay teacher's pet." },
    { floor: 10, text: "If you're this low and still don't have a j*b yet, I'm doomed." },
    { floor: 1, text: "You are a disgrace to the beaver community." },
    { floor: 0, text: "Holy critter." },
  ];

  return (
    <div className='results-div'>
      <h1 className='score-title'>Your Beaver Purity Score</h1>
      <p className='text score-text orange-text bold-text'>{score} / 100</p>

      <p className='text p-text'>{messages.find(m => score >= m.floor)?.text}</p>

      <div className='result-buttons-div'>
        <a href='/'>
          <button
            className='try-again-button'
          >
            Try Again
          </button>
        </a>
      </div>

      <Footer/>
    </div>
  )
}