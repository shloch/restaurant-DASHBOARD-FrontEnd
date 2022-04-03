import React, { useState } from "react"
const ShopContext = React.createContext()
/*
1 - France
2 - Spain
*/

function ShopContextProvider(props) {
    const [shopID, setShopID] = useState('1')
    
    function changeShop(newShopID) {
        setShopID(newShopID)
    }
    
    return (
        <ShopContext.Provider value={{shopID, changeShop}}>
            {props.children}
        </ShopContext.Provider>
    )
}

export {ShopContextProvider, ShopContext}