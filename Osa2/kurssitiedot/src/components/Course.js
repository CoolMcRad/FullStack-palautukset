import React from 'react'

const Total = ({ course }) => {
  let sum = []

  course.parts.map(course => sum.push(course.exercises))
  return (
    <p>
    {"Total of "}
    {sum.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue
    }, 0)}
     {" exercises"}
  </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
        {course.map(course => 
        <ul key={course.id} course={course} >
          <h1>{course.name}</h1>
          {course.parts.map(course => 
          <p key={course.id}>
            {course.name} {course.exercises}
          </p>
          )}
            <Total course={course} />
        </ul>
        )}
  </div>
  )
}

export default Course