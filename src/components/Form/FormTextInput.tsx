import React from "react"

interface Props {
    name : string
}

export const FormTextInput = ({name} : Props) => {

    return(
        <input name = {name} type = "text"/>
    )
}