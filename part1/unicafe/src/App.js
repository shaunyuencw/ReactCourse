import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>
const StatisticLine = ({ text, value }) => <div>{text} {value}</div>
const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  let average = (props.good + -1 * props.bad)/(all)
  let positive = (props.good/all)*100

  if (all > 0){
    return (
      <>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </>
    )
  }
  else{
    return (
      <>
        No feedback given
      </>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  return (
    <>
      <Heading text="Give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <Heading text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App