import React, { PureComponent, useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';
import useBudget from '../../../hooks/useBudget';






import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const TotalBudgetChart = () => {
    const { budgets,expenses, getBudgetExpenses } = useBudget()

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
    // const cx = "50%";
    // const cy = "50%";
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
            <text
                x={cx}
                y={cy} 
                dy={8} textAnchor="middle" fill="#FF0A00">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy} 
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill="#FF0A00"
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill="#FF0A00"
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="#FFF"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#FFf"
            >{`$${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#FFF"
            >
                {`(${(percent * 100).toFixed(0)}%)`}
            </text>
        </g>
    );
};
















    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    
    const data = getBudgetExpenses(expenses)
    console.log(data);
    
    return (
        // <Container  className="d-flex p-5 justify-content-center">
            <div style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer>

            <PieChart width={400} height={400}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={expenses}
                    cx="50%"
                    cy="50%"
                    innerRadius="30%"
                    outerRadius="60%"
                        fill="#fff"
                    dataKey="amount"
                    onMouseEnter={onPieEnter}
                    />
            </PieChart>
                    </ResponsiveContainer>
                    </div>
        //  </Container> 
    );

}


export default TotalBudgetChart;