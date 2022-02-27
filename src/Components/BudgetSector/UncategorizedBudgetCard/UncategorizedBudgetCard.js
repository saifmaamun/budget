import React from 'react';
import useBudget from '../../../hooks/useBudget';
import BudgetCard from '../BudgetCard/BudgetCard';

const UncategorizedBudgetCard = (props) => {

const {getBudgetExpenses, UNCATEGORIZED_BUDGET_ID}=useBudget()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)


    if (amount===0) return null
    return (
        <BudgetCard
            name="Uncategorized"
            {...props}
            amount={amount}
        
        />
    );
};

export default UncategorizedBudgetCard;