import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import AddExpensesModal from '../AddExpensesModal/AddExpensesModal';
import AddSectorModal from '../AddSectorModal/AddSectorModal';

const Header = () => {
    const [showAddSectorModal, setShowAddSectorModal] = useState(false);
    const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);
    const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] = useState();


    const openAddExpensesModal = budgetId => {
        setShowAddExpensesModal(true)
        setAddExpensesModalBudgetId(budgetId)
    }



    return (
        
        <>
        <Stack direction="horizontal" gap={3} className="my-5">
         <h1 className="me-auto" >Budgets</h1>
         <Button variant="primary" onClick={()=>setShowAddSectorModal(true)} >Add Sector</Button>
                <Button variant="outline-secondary"
                    onClick={openAddExpensesModal}
                >Add Expense</Button>
            </Stack> 
            <AddSectorModal show={showAddSectorModal} handleClose={() => setShowAddSectorModal(false)} />
            <AddExpensesModal
                defaultBudgetId={addExpensesModalBudgetId}
                show={showAddExpensesModal}
                handleClose={() => setShowAddExpensesModal(false)}
            />
        </>
        )
};

export default Header;















































// import React, { useState } from 'react';
// import { Button, Stack } from 'react-bootstrap';
// import AddSectorModal from '../AddSectorModal/AddSectorModal';

// const Header = () => {
//     const des = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


//     let spl = des.split('. ')
//     return (
//         <div className="mt-5">
        
//             <div>
//                 <h5>{ des}</h5>
//                 {
//                     spl.map(a =>
//                         <ul
//                             a={a}>
//                             <li>{a}</li>
//                         </ul>

//                     )
//                 }
//             </div>
//         </div>
//     );
// };

// export default Header;