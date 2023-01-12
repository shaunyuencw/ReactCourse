import { useState } from 'react'

const QOTD = ({ text, votes, handleClick }) => <div><h1>Anecdote of the day</h1>{text}<br/> has {votes} votes</div>
const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>
const Leaderboard = ({ anecdotes }) => {
  let text = "temp"
  let votes = 0

  anecdotes.forEach(anecdote => {
    if (anecdote.votes > votes){
      votes = anecdote.votes
      text = anecdote.quote
    }
  })
  
  if (votes === 0) {
    return (
      <div><h1>Anecdote with most votes</h1>No votes casted yet</div>
    )
  }
  return (
    <div><h1>Anecdote with most votes</h1>{text}<br/> has {votes} votes</div>
  )
  

}
const App = () => {
  const [anecdotes, setVote] = useState([
    {quote: 'If it hurts, do it more often. wtf', votes: 0},
    {quote: 'Adding manpower to a late software project makes it later!', votes: 0}, 
    {quote:'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {quote:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {quote:'Premature optimization is the root of all evil.', votes: 0},
    {quote:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
  ])
   
  const vote = (selected) => () => {
    const copy = [...anecdotes]
    copy[selected].votes += 1
    setVote(copy)
  }
  const [selected, setSelected] = useState(0)

  return (
    <div>

      <QOTD text={anecdotes[selected].quote} votes={anecdotes[selected].votes} handleClick={vote(selected)} />
      <Button text="vote" handleClick={vote(selected)} />
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} />

      <Leaderboard anecdotes={anecdotes} />
    </div>
  )
}

export default App