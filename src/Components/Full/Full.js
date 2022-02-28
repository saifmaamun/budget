import React,{useState} from 'react';
import { Container } from 'react-bootstrap';
import BudgetSector from '../BudgetSector/BudgetSector/BudgetSector';
import TotalBudgetCard from '../BudgetSector/TotalBudgetCard/TotalBudgetCard';
import TotalBudgetChart from '../Charts/TotalBudgetChart/TotalBudgetChart';
import Header from '../Header/Header';
import Particles from "react-tsparticles";

const Full = () => {
  
    

    return (
        <div>
            
            
            <Container>

                <Header />
                <BudgetSector />
                <TotalBudgetChart/>
            </Container>
        </div>
    );
};

export default Full;