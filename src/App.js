import './App.css';
import BudgetProvider from './context/BudgetProvider';
import Full from './Components/Full/Full';

function App() {
  return (
    <BudgetProvider>
<Full/>
   
    </BudgetProvider>
  );
}

export default App;
