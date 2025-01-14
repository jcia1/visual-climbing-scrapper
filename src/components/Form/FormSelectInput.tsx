import React, { ChangeEvent } from "react"
import { ReactNode } from "react"

interface Props {
    onChange? : (e: ChangeEvent<HTMLSelectElement>) => void
    disabled? : boolean
    selectOptions : ReactNode
}

export const FormSelectInput = ({selectOptions, onChange, disabled = false} : Props) => {

    return(
        <select onChange={onChange} disabled = {disabled}> 
            {selectOptions}
        </select>
    )
}