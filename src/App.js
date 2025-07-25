import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import CorePerspectiveOfViron from './pages/CorePerspectiveOfViron';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';
import Login from './pages/Login';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PaymentLandingPage from './pages/PaymentLandingPage';
import MemberList from './pages/MemberList';
import UserLisetForMember from './pages/UserLisetForMember';
import { ToastContainer } from 'react-toastify'; // ✅ Import here
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './pages/ScrollToTop'; // Import the ScrollToTop component
import AdminEditAccount from './pages/AdminEdit';

function App() {
  const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === '1';


  return (
    <>
     
    <Router basename="/member">
    <ScrollToTop />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar closeOnClick />
      <Routes>
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<LoginPage />} />

        <Route path='/loginPage' element={<LoginPage />} />
        {/* <Route path="/" element={!isAdmin?<VironNotice />:<UserList/>} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <VironNotice />
            </ProtectedRoute>
          }
        />
        <Route
         path='/paymentlandingpage'
         element={<PaymentLandingPage />}
        />
        <Route
          path='/admin/userlist'
          element={
            <ProtectedRoute adminOnly={true}>
              <UserList />
            </ProtectedRoute>
          }
        />
         <Route
          path='/admin/memberlist'
          element={
            <ProtectedRoute adminOnly={true}>
              <MemberList />
            </ProtectedRoute>
          }
        />
                 <Route
          path='/admin/adminedit'
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminEditAccount />
            </ProtectedRoute>
          }
        />
         <Route
          path='/userlist'
          element={
            <ProtectedRoute adminOnly={true}>
              <UserLisetForMember />
            </ProtectedRoute>
          }
        />
        <Route
          path='/edit-account'
          element={
            <ProtectedRoute>
              <EditAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mlm-qualifications"
          element={
            <ProtectedRoute>
              <MLMCompanyQualifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/why-save-club"
          element={
            <ProtectedRoute>
              <WhySaveClub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/earnings-disclaimers"
          element={
            <ProtectedRoute>
              <EarningsDisclaimers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expectations-of-viron"
          element={
            <ProtectedRoute>
              <ExpectationsOfViron />
            </ProtectedRoute>
          }
        />
        <Route
          path="/core-perspective-of-viron"
          element={
            <CorePerspectiveOfViron>
              <ExpectationsOfViron />
            </CorePerspectiveOfViron>
          }
        />
        {/* <Route
          path="/forgot-password"
          element={
            <ForgotPassword>
              <ExpectationsOfViron />
            </ForgotPassword>
          }
        /> */}
        <Route
          path="/forgotPassword"
          element={
            <ForgotPasswordPage>
              <ExpectationsOfViron />
            </ForgotPasswordPage>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;