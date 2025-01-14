import React from "react"
import { ReactNode } from "react"
import './Form.css'

interface Props {
    inputs : ReactNode,
    button? : ReactNode
}

export const Form =({inputs,button} : Props) => {
    return (
        <form className = 'custom-form'>
            {inputs}
            {button}
        </form>
    )
}