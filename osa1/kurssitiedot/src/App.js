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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header kurssi={course} />
      <Content osa1={part1.name} harjoitukset1={part1.exercises} 
        osa2={part2.name} harjoitukset2={part2.exercises} 
        osa3={part3.name} harjoitukset3={part3.exercises} />
      <Total yhteensa={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App
