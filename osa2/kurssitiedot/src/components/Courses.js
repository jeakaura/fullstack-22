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

export default Courses