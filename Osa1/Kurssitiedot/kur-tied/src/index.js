import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.kurssi.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.osa.name} {props.osa.exercises} 
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part osa={props.kurssi.parts[0]} />
      <Part osa={props.kurssi.parts[1]} />
      <Part osa={props.kurssi.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.kurssi.parts[0].exercises 
      + props.kurssi.parts[1].exercises 
      + props.kurssi.parts[2].exercises}</p>
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
      <Header kurssi={course} />
      <Content kurssi={course} />
      <Total kurssi={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))