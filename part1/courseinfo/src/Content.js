import React from 'react'

import { Part } from './Part'

export const Content = (props) => {

    return (
        <p>

            <Part part={props.parts[0]}></Part>
            <Part part={props.parts[1]}></Part>
            <Part part={props.parts[2]}></Part>
        </p>
    )
}