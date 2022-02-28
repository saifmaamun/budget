import './App.css';
import BudgetProvider from './context/BudgetProvider';
import Full from './Components/Full/Full';

import Particles from "react-tsparticles";

function App() {
  
  return (
    <BudgetProvider>
<Full/>
    </BudgetProvider>
  );
}

export default App;
