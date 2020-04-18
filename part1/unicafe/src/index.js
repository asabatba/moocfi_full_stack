import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => (<h1>{props.text}</h1>)

const Button = (props) => {

  const handleClick = () => {
    props.updater(props.value + 1);
  }

  return (<button onClick={handleClick}>
    {props.name}
  </button>)
}

const Statistic = (props) => (<div>{props.name} : {props.value}</div>)

const Statistics = (props) => {

  const all = Object.values(props);
  console.log(all)

  const sum = all.reduce((acc, v) => acc + v, 0);

  if (sum === 0)
    return (<div>
      <Title text="statistics"></Title>
      <span>No feedback given yet</span>
    </div>)

  const avg = (props.good - props.bad) / all.length;
  const positive = props.good / (sum > 0 ? sum : 1) * 100 + ' %';

  return (<div>
    <Title text="statistics"></Title>
    <Statistic name="good" value={props.good}></Statistic>
    <Statistic name="neutral" value={props.neutral}></Statistic>
    <Statistic name="bad" value={props.bad}></Statistic>
    <Statistic name="all" value={sum}></Statistic>
    <Statistic name="average" value={avg}></Statistic>
    <Statistic name="positive" value={positive}></Statistic>
  </div>)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback"></Title>
      <Button name="good" value={good} updater={setGood}></Button>
      <Button name="neutral" value={neutral} updater={setNeutral}></Button>
      <Button name="bad" value={bad} updater={setBad}></Button>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)