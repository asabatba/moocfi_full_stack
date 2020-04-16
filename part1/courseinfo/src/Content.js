import React from 'react'

import { Part } from './Part'

export const Content = (props) => {
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <p>

            <Part part={part1} exes={exercises1}></Part>
            <Part part={part2} exes={exercises2}></Part>
            <Part part={part3} exes={exercises3}></Part>
        </p>
    )
}