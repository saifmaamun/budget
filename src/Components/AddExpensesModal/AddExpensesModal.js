import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useBudget from '../../hooks/useBudget';

const AddExpensesModal = ({ show, handleClose,defaultBudgetId }) => {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpenses, budgets, UNCATEGORIZED_BUDGET_ID } = useBudget();


    function handleSubmit(e) {
        e.preventDefault()
        addExpenses({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        })
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Form onSubmit={handleSubmit}>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        New Expense
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" placeholder="Enter Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} type="number" placeholder="Enter Max Limit" required min={0} step={0.01} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Sector</Form.Label>
                         <Form.Select
                        defaultValue={defaultBudgetId}
                            ref={budgetIdRef} >
                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {
                                budgets.map(budget => (
                                    <option key={budget.id} value={budget.id}>{budget.name }</option>
                                ))
                            }
                            </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="outline-danger" type="submit">
                            Add Expense
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};


export default AddExpensesModal;