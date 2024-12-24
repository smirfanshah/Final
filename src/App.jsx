import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Authenticator from './components/Authenticator';

function App() {
   return (
     <Router>
       <Routes>
         <Route path="/login" element={<Login />} />
         <Route 
           path="/"
           element={
             <Authenticator>
               <Homepage />
             </Authenticator>
           } 
         />
       </Routes>
     </Router>
   );
}

export default App;
