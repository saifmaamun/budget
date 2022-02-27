import React from 'react';
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';
import useBudget from '../../../hooks/useBudget';

const BudgetCard = ({ name, amount, max, onAddExpenseClick, hidebuttons}) => {
    // const { name, amount, max }=budget;
    const { currencyFormatter } = useBudget();


    // card background change
    const classNames = [];
    if (amount > max) {
        classNames.push("bg-danger", "bg-opacity-10")
    }
    else {
        classNames.push("bg-light")
    }


    // progress bar color change
    const progressBarVariant = (amount, max) => {
        const ratio = amount / max;
        if (ratio < 0.5) {
            return "primary"
        }
        if (ratio < 0.75) {
            return "warning"
        }
        else {
            return "danger"
        }
    }
    return (
        <Card className={classNames.join(" ")} >
        <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                <div>{name}</div>
                <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)}
                    {max && <span className="text-muted ms-1 fs-6">
                        / {currencyFormatter.format(max)}
                    </span>}
                </div>

            </Card.Title>
            {max &&<ProgressBar className="rounded-pill" variant={progressBarVariant(amount, max)}
                min={0}
                max={max}
                now={amount} />}
                {!hidebuttons && <Stack direction="horizontal" gap={3} className="mt-4">
                <Button className="ms-auto" variant="outline-danger" 
                        onClick={onAddExpenseClick}
                    >Add Expense</Button>
                <Button variant="outline-secondary">View Expense</Button>
            </Stack>}
            </Card.Body>
            </Card>
    );
};

export default BudgetCard;