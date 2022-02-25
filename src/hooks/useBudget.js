import { useContext } from "react"
import { BudgetContext } from "../context/BudgetProvider"


const useBudget = () => {
    return useContext(BudgetContext)
}

export default useBudget;