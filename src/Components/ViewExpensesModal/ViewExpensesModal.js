import React, { PureComponent, useCallback, useState } from 'react';
import { Button, Container, Modal, Stack } from 'react-bootstrap';
import useBudget from '../../hooks/useBudget';

import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`$ ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Overall ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};











const ViewExpensesModal = ({ budgetId, handleClose, defaultBudgetId }) => {


    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );







    
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


                <Container fluid className="d-flex justify-content-center">
                    <PieChart width={400} height={400}>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={expenses}
                            cx={200}
                            cy={200}
                            innerRadius={50}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="amount"
                            onMouseEnter={onPieEnter}
                        />
                    </PieChart>
                </Container>




            </Modal.Body>
        </Modal>
    );
};



export default ViewExpensesModal;