import React,{useState} from 'react';
import { Container } from 'react-bootstrap';
import BudgetSector from '../BudgetSector/BudgetSector/BudgetSector';
import Header from '../Header/Header';

const Full = () => {
    return (
        <div>
            <Container>
                <Header />
                <BudgetSector/>
            </Container>
        </div>
    );
};

export default Full;