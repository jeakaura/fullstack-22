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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header kurssi={course} />
      <Content osa1={part1} harjoitukset1={exercises1} 
        osa2={part2} harjoitukset2={exercises2}
        osa3={part3} harjoitukset3={exercises3} />
      <Total yhteensa={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
