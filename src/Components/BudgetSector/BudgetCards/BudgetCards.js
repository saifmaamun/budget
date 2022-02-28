import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import useBudget from '../../../hooks/useBudget';
import AddExpensesModal from '../../AddExpensesModal/AddExpensesModal';
import ViewExpensesModal from '../../ViewExpensesModal/ViewExpensesModal';
import BudgetCard from '../BudgetCard/BudgetCard';
import TotalBudgetCard from '../TotalBudgetCard/TotalBudgetCard';
import UncategorizedBudgetCard from '../UncategorizedBudgetCard/UncategorizedBudgetCard';

const BudgetCards = () => {
    const { budgets, getBudgetExpenses, UNCATEGORIZED_BUDGET_ID } = useBudget();
    const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);
    const [viewExpensesModalBudgetId, setViewExpensesModalId] = useState();
    const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] = useState();

    const openAddExpensesModal = budgetId => {
        setShowAddExpensesModal(true)
        setAddExpensesModalBudgetId(budgetId)
    }
    return (
        <div>
            <Row className="g-4" >
                {
                    budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                        return (

                            <Col sm={12} md={6} lg={4}>
                                <BudgetCard
                                    key={budget.id}
                                    budget={budget}
                                    name={budget.name}
                                    amount={amount}
                                    max={budget.max}
                                    onAddExpenseClick={() => openAddExpensesModal(budget.id)}
                                    onViewExpenseClick={() => setViewExpensesModalId(budget.id)}
                                />
                            </Col>
                        )
                    })

                }
                <Col sm={12} md={6} lg={4}>
                    <UncategorizedBudgetCard
                        onAddExpenseClick={openAddExpensesModal}
                        onViewExpenseClick={() => setViewExpensesModalId(UNCATEGORIZED_BUDGET_ID)}
                    ></UncategorizedBudgetCard>
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <TotalBudgetCard></TotalBudgetCard>
                </Col>
            </Row>




            <AddExpensesModal
                defaultBudgetId={addExpensesModalBudgetId}
                show={showAddExpensesModal}
                handleClose={() => setShowAddExpensesModal(false)}
            />

            <ViewExpensesModal
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalId()}
            ></ViewExpensesModal>

        </div>
    );
};

export default BudgetCards;