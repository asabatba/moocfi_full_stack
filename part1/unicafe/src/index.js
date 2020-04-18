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

const Counter = (props) => (<div>{props.name} : {props.value}</div>)

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

      <Title text="statistics"></Title>
      <Counter name="good" value={good}></Counter>
      <Counter name="neutral" value={neutral}></Counter>
      <Counter name="bad" value={bad}></Counter>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)