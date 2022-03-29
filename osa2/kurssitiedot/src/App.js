import React from "react";

const Courses = ({ courses }) => {
  return(
    <div>
      {courses.map(({ name, id, parts }) => (
        <Content key={id} name={name} parts={parts} />
      ))}
    </div>
  )
}

const Content = ({ name, parts }) => {
  return(
    <div>
      <Header name={name} />
      <Part parts={parts} />
    </div>
  )
}

const Part = ({ parts }) => {
  return(
    <div>
      {parts.map(({ name, exercises, id }) => (
        <Osa key={id} name={name} exercises={exercises} />
      ))}
    <Yhteensa parts={parts} />
    </div>
  )
}

const Osa = ({ name, exercises }) => {
  console.log(name, exercises)
  return(
    <p>
      {name} {exercises}
    </p>
  )
}

const Header = ({ name }) => {
  return(
    <h3>
      {name}
    </h3>
  )
}

const Yhteensa = ({ parts }) => {
  const total = parts.reduce(
    (edellinenArvo, nykyinenArvo) => {
      return edellinenArvo + nykyinenArvo.exercises;
    }, 
    0
  );

  return(
    <p><b>Total of {total} exercises</b></p>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App;
