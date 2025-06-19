import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FaTachometerAlt, FaUsers, FaQuestionCircle, FaSignOutAlt, FaCog, FaChartLine } from 'react-icons/fa';

function Sidebar() {
  const isAdmin = localStorage.getItem('isAdmin') === '1';
  let username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    navigate('/loginPage');
  };

  return (
    <aside className="sidebar">
      {/* <div className="sidebar-header">
        <h2>VIRON</h2>
      </div> */}
      <ul className="sidebar-menu">
         {isAdmin ?<><li>
            <NavLink to="/admin/userlist" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaUsers /> <span>User List</span>
            </NavLink>
          </li>
           <li>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </li>
          
          </>:<> 
        <li className="menu-group-title">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaTachometerAlt /> <span>Dashboard</span>
          </NavLink>
        </li>

        <li> 
          <NavLink to="/username" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaTachometerAlt /> <span>Your VIRON Username: {username}</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/referranl" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaTachometerAlt /> <span>Your VIRON Referral Link: VIRON.NETWORK/{username}</span>
          </NavLink>
        </li>

        <li className="menu-group-title" style={{ textAlign:'center'}}>INFORMATION & RESOURCES:</li>
        <li>
          <NavLink to="/expectations-of-viron" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaChartLine /> <span>Expectations of VIRON</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/core-perspective-of-viron" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaChartLine /> <span>Core Perspective of VIRON</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/mlm-qualifications" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaChartLine /> <span>MLM Qualifications</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/why-save-club" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaCog /> <span>Why SAVE CLUB</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaQuestionCircle /> <span>FAQ</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/earnings-disclaimers" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaChartLine /> <span>Earnings Disclaimers</span>
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/edit-account" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaCog /> <span>Edit Account</span>
          </NavLink>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </li>
          </>
          
        }
        
      </ul>
    </aside>
  );
}

export default Sidebar;
