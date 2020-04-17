import React from 'react'



export const Total = (props) => (
    <p>Number of exercises {props.parts.reduce((acc, p) => acc + p.exercises, 0)}</p>
)