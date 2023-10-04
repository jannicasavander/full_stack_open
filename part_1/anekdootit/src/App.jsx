import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const updatedPoints = (index) => {
    const copy = [...points]
    copy[index] += 1
    return copy
  }

  const updatePoints = (index) => {
    const newPoints = updatedPoints(index)
    setPoints(newPoints)
  }

  const [selected, setSelected] = useState(0)

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <Button handleClick={() => updatePoints(selected)} text="vote"/>
      <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[points.indexOf(Math.max(...points))]}
      </div>
      <div>
        has {Math.max(...points)} votes
      </div>
    </>
  )
}

export default App
