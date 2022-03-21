import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ counter, text }) => (
  <div>{text} {counter}</div>
)

const Statistics = ({ good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = (good/all)*100

  if (all==0) {
    return(
      <div>Palautetta ei ole annettu</div>
    )
  } else {
    return(
      <div>
        hyvä {good} <br />
        neutraali {neutral} <br />
        huono {bad} <br />
        kaikki {all} <br />
        keskiarvo {average} <br />
        positiivisia {positive}%
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={() => setGood(good + 1)} text={"hyvä"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutraali"} />
      <Button handleClick={() => setBad(bad + 1)} text={"huono"} />
      <h1>statistiikat</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
