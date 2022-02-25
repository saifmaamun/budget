import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useBudget from '../../hooks/useBudget';

const AddSectorModal = ({ show, handleClose }) => {
    const nameRef = useRef()
    const maxRef = useRef()
const {addBudget} =useBudget();


    function handleSubmit(e) {
        e.preventDefault()
        addBudget({
            name: nameRef.current.value,
            max:parseFloat(maxRef.current.value),
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
                    New Sector
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Enter Name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control ref={maxRef} type="number" placeholder="Enter Max Limit" required min={0} step={ 0.01}/>
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

export default AddSectorModal;