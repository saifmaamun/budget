import React from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import useBudget from '../../hooks/useBudget';


const ViewExpensesModal = ({ budgetId, handleClose, defaultBudgetId }) => {
    const { budgets, getBudgetExpenses, deleteBudget,
        deleteExpense, UNCATEGORIZED_BUDGET_ID, currencyFormatter } = useBudget();

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ?
        { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(budget => budget.id === budgetId)


    const expenses = getBudgetExpenses(budgetId)

    return (
        <Modal
            show={budgetId != null}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>

                <Stack direction="horizontal" gap={3}>

                    <div> Expenses - {budget?.name}</div>
                    {
                        budgetId !== UNCATEGORIZED_BUDGET_ID &&
                        <Button
                            onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }}
                            variant="outline-danger"
                        >Delete</Button>
                    }
                </Stack>

                <Modal.Title id="contained-modal-title-vcenter">

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap={3}>

                    {expenses.map(expense =>
                        <Stack direction="horizontal" gap={2} key={expense.id}>
                            <div className="me-auto fs-5">{expense.description}</div>
                            <div className="fs-6">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
                        </Stack>
                    )}
                </Stack>

            </Modal.Body>
        </Modal>
    );
};



export default ViewExpensesModal;