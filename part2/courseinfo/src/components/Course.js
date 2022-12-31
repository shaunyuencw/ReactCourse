const Course = ( props ) => {
    return (
      <>
        <h1>{props.course.name}</h1>
        <Content parts={props.course.parts} />
      </>
    )
  }
  
const Content = (props) => {
const totalExercises = props.parts.reduce(
    (accumulator, currentValue) => { 
    // Updates the accumulator with the result of the callback function
    return accumulator + currentValue.exercises
    }, 0)

return (
    <>
    {props.parts.map(part =>  <Part part={part} key={part.id} />)}
    <b>Total exercises: {totalExercises}</b>
    </>
)
}

const Part = (props) => {
//console.log(props)
return (
    <>
    <p>{props.part.name}: {props.part.exercises}</p>
    </>
)
}

export default Course