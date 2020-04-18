import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Next = (props) => {

  const rng = () => Math.floor(Math.random() * anecdotes.length);
  const handleClick = () => {
    props.setSelected(rng);
  };
  return (<button onClick={handleClick}>Another!</button>)
}

const Vote = (props) => {

  const handleClick = () => {
    const newState = [...props.votes]
    newState[props.selected]++;
    props.setFunction(newState);
  };
  return (<button onClick={handleClick}>Vote+</button>)
}

const MostVotes = (props) => {

  const maxVotes = props.votes.reduce((acc, v) => Math.max(acc, v), 0);
  const idx = props.votes.indexOf(maxVotes)

  useEffect(() => {
    // Check if element is only rebuilt on [idx] change.
    console.log('effected!')
    document.title = anecdotes[idx]
  }, [idx])

  return (
    <div>
      <h2>Top anecdote ({maxVotes} votes)</h2>
      <span>{anecdotes[idx]}</span>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  return (
    <div>
      <h2>{props.anecdotes[selected]}</h2>
      <h3>has {votes[selected]} votes</h3>
      <Vote selected={selected} votes={votes} setFunction={setVotes}></Vote> <Next setSelected={setSelected}></Next>
      <MostVotes votes={votes}></MostVotes>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)