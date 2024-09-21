import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RentalContracts from './pages/RentalContracts';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard'; 


function App() {
  return (
<div>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

        {/* <Route path="/about" element={<RentalContracts />} />
        <Route path="/sidebar" element={<Sidebar />} /> */}
      </Routes>
    </BrowserRouter>

{/*<BrowserRouter>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/bikes" element={<BikeForm />} />
          <Route path="/rental-contracts" element={<RentalContracts />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  */}

</div>


    
    

);
}

export default App;