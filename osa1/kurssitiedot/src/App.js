const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        <Part osa={props.osa1} maara={props.harjoitukset1} />
        <Part osa={props.osa2} maara={props.harjoitukset2} />
        <Part osa={props.osa3} maara={props.harjoitukset3} />
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.osa} {props.maara}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.yhteensa}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Header kurssi={course.name} />
      <Content osa1={course.parts[0].name} harjoitukset1={course.parts[0].exercises}
        osa2={course.parts[1].name} harjoitukset2={course.parts[1].exercises}
        osa3={course.parts[2].name} harjoitukset3={course.parts[2].exercises} />
      <Total yhteensa={course.parts[0].exercises + course.parts[1].exercises 
        + course.parts[2].exercises} />
    </div>
  )
}

export default App
