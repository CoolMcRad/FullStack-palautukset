import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.good+props.neutral+props.bad === 0) {
    return (
      <div>
        Palautetta ei ole annettu
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Hyvä " values={props} />
          <StatisticLine text="Neutraali " values={props} />
          <StatisticLine text="Huono " values={props} />
          <StatisticLine text="Määrä " values={props} />
          <StatisticLine text="Keskiarvo " values={props} />
          <StatisticLine text="Positiivisia " values={props} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, values}) => {
  const good = values.good
  const neutral = values.neutral
  const bad = values.bad
  if (text === "Hyvä ") {
    return (
        <tr>
          <td>{text}</td>
          <td>{good}</td>
        </tr>
    )
  }
  if (text === "Neutraali ") {
    return (
      <tr>
        <td>{text}</td>
        <td>{neutral}</td>
      </tr>
    )
  }
  if (text === "Huono ") {
    return (
      <tr>
        <td>{text}</td>
        <td>{bad}</td>
      </tr>
    )
  }
  if (text === "Määrä ") {
    return (
      <tr>
        <td>{text}</td>
        <td>{good + neutral + bad}</td>
      </tr>
    )
  }
  if (text === "Keskiarvo ") {
    return (
      <tr>
        <td>{text}</td>
        <td>{(good + bad*-1)/(good+neutral+bad)}</td>
      </tr>
    )
  }
  if (text === "Positiivisia ") {
    return (
      <tr>
        <td>{text}</td>
        <td>{100*(good/(good+neutral+bad))} %</td>
      </tr>
    )
  }
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => 
    setGood(good + 1)

  const handleClickNeutral = () => 
    setNeutral(neutral + 1)

  const handleClickBad = () => 
    setBad(bad + 1)

  return (
    <div>
      <h1>Anna palautetta!</h1>
        <Button onClick={handleClickGood} text='Hyvä' />
        <Button onClick={handleClickNeutral} text='Neutraali'/>
        <Button onClick={handleClickBad} text='Huono' />
      <h1>Statistiikka</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)