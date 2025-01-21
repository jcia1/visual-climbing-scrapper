import { createContext, ReactNode, useContext, useState } from "react"
import React from "react"

interface GlobalContextType {
    value : number
    setValue: React.Dispatch<React.SetStateAction<number>>
}

// Context
export const GlobalContext = createContext<GlobalContextType>({
    value: 0,
    setValue: () => {}
})

// Provider component and props.
interface GlobalContextProps {
    children : ReactNode
}

export const GlobalProvider = ({children} : GlobalContextProps) => {

    const [value, setValue] = useState<number>(0);

    return (
        <GlobalContext.Provider value = {{value,setValue}}>{children}</GlobalContext.Provider>
    )
}

// Hook to use the context isntead of using React One.
/**
 * TO USE IT = const {value, setValue} = useGlobalContext() allways in a component inside the provider.   
 * TRY NOT TO USE IT WHEN THERES A RELATIONSHIP CHILD/FATHER BETWEEN COMPONENTS.
 * @returns 
 */
export const useGlobalContext = () => {
    const context = useContext(GlobalContext)

    if(!context) {
        throw new Error("Global context must be user within a GlobalContexProvider")
    } else return context
}