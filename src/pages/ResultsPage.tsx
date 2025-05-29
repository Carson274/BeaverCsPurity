import Footer from '../components/Footer'
import type { MessageItem } from '../types'

export default function ResultsPage({ score }: { score: number }) {
  const messages: MessageItem[] = [
    { range: "90-100", text: "You must either be a freshman or have a social life. Congrats! Goodluck finding a j*b though." },
    { range: "80-89", text: "" },
    { range: "70-79", text: "" },
    { range: "60-69", text: "" },
    { range: "50-59", text: "Uh oh. STEM critter alert! 🚨🤓" },
    { range: "40-49", text: "" },
    { range: "30-39", text: "" },
    { range: "20-29", text: "" },
    { range: "10-19", text: "" },
    { range: "0-9", text: "" },
  ];

  return (
    <div className='results-div'>
      <h1 className='score-title'>Your Beaver Purity Score</h1>
      <p className='text score-text orange-text bold-text'>{score} / 100</p>

      <p className='text p-text'>
        {score === 69 ? "Nice." : messages[score % 10].text}
      </p>

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