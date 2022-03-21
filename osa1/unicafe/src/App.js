import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ counter, text }) => (
  <div>{text} {counter}</div>
)

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
      <Display counter={good} text="hyvä" />
      <Display counter={neutral} text="neutraali" />
      <Display counter={bad} text="huono" />
      <Display counter={good + neutral + bad} text="kaikki" />
      <Display counter={(good - bad)/(good + neutral + bad)} text="keskiarvo" />
      <Display counter={good / (good + neutral + bad) * 100} text="positiivisia %" />
    </div>
  )
}

export default App
