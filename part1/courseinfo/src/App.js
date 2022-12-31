const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part}: {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(part => (
        <Part part={part.name} exercises={part.exercises} key={part.name}/>
      ))}
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(part => {
    total += part.exercises
  })

  return (
    <p>
      Number of exercises: {total}
    </p>
  )
}

const App = () => {
  const course =  {
    name: 'Half Stack application development',
    parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        },
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts = {course.parts}/>
    </>
  )
}

export default App