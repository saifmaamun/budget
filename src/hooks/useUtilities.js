import { useState } from "react";
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from "./useLocalstorage";



const useUtilities = () => {
    
    const UNCATEGORIZED_BUDGET_ID = "Uncategorized";


const [budgets,setBudgets]=useLocalStorage("budgets",[])
const [expenses,setExpenses]=useLocalStorage("expenses",[])

    
    
    // get expenses
    const getBudgetExpenses = (budgetId)=>{
return expenses.filter(expense=>expense.budgetId===budgetId)
    }



// add expenses
    const addExpenses=({description,amount,budgetId})=>{
        setExpenses(prevExpenses => {
            
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }



    // add budget
    const addBudget = ({ name, max }) => {
        
        setBudgets(prevBudgets => {
        if (prevBudgets.find(budget => budget.name === name)){
            return prevBudgets
        }
    return [...prevBudgets,{ id:uuidV4(),name,max}]
})
    }


// delete budget
    const deleteBudget=({id})=>{
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget=>budget.id!==id)
        })
    }



    // delete expenses
    const deleteExpense=({id})=>{
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }





    const currencyFormatter = new Intl.NumberFormat(undefined, {
        currency: "usd",
        style: "currency",
        minimumFractionDigits: 0
    })

    
    return {
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpense,
        currencyFormatter,
        UNCATEGORIZED_BUDGET_ID

    }
};

export default useUtilities;