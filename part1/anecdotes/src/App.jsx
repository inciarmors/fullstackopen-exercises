import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const maxVotes = Math.max(...votes)
  const bestIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNextAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[bestIndex]} votes={votes[bestIndex]} />
    </div>
  )
}

export default App
