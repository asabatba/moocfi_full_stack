
import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    // const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
    const sum = course.parts.reduce((acc, v) => acc + v.exercises, 0);
    return (
      <p>Total of exercises {sum}</p>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((p) => (<Part key={p.id} part={p} />))}
      </div>
    )
  }
  
  const Course = ({ course }) => {
  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  export default Course