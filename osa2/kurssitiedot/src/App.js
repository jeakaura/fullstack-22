const Course = ({ course }) => {
  return(
    <div>
      <Header content={course} />
      <Content parts={course.parts} />
    </div>
  )
}

const Header = ({ content }) => {
  return(
    <h1>
      {content.name}
    </h1>
  )
}

const Content = ({ parts }) => {
  return(
    <div>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return(
    <div>
      {name} {exercises}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
