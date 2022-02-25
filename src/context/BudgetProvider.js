import React, { createContext } from "react";
import useUtilities from "../hooks/useUtilities";


export const BudgetContext = createContext();

const BudgetProvider = ({ children }) => {
    const allContext = useUtilities();
    return (
        <BudgetContext.Provider value={allContext}>
            {children}
        </BudgetContext.Provider>
    )
}

export default BudgetProvider;