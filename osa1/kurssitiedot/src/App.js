const Header = (props) => {
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
        {props.osa} {props.harjoitukset}
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header kurssi={course} />
      <Content osa={part1} harjoitukset={exercises1} />
      <Content osa={part2} harjoitukset={exercises2} />
      <Content osa={part3} harjoitukset={exercises3} />
      <Total yhteensa={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
