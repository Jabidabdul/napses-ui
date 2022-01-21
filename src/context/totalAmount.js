import React ,{createContext} from 'react'

export const AmountContext = createContext();

export const AmountProvider = (props)=>{

    const [totalAmount, setTotalAmount] = React.useState(0);
    const [totalItems, setTotalItems] = React.useState(0);
    return (
        <AmountContext.Provider value={[totalAmount,setTotalAmount,totalItems,setTotalItems]}>
            {props.children}
        </AmountContext.Provider>
    )
}