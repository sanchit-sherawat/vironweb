import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VironNotice from './pages/VironNotice';
import UserList from './pages/UserList';
import GridTest from './pages/GridTest';
import EditAccount from './pages/EditAccount';
import MLMCompanyQualifications from './pages/MLMCompanyQualifications';
import WhySaveClub from './pages/WhySaveClub';
import FAQ from './pages/FAQ';
import EarningsDisclaimers from './pages/EarningsDisclaimers';
import ExpectationsOfViron from './pages/ExpectationsOfViron';
import './App.css'; // Assuming you have some global styles
import Login from './pages/Login';





function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />
        {/* Add more routes as needed */}
        <Route path='/dashboard' element={<VironNotice />} />
        <Route path='/admin/userlist' element={<UserList />} />
        <Route path='/edit-account' element={<EditAccount />} />
        <Route path="/mlm-qualifications" element={<MLMCompanyQualifications />} />
        <Route path="/why-save-club" element={<WhySaveClub />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/earnings-disclaimers" element={<EarningsDisclaimers />} />
        <Route path="/expectations-of-viron" element={<ExpectationsOfViron />} />

      </Routes>
    </Router>
  );
}

export default App;