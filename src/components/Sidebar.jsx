import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FaTachometerAlt, FaUsers, FaSignOutAlt, FaQuestionCircle, FaCog, FaDotCircle } from 'react-icons/fa';

function Sidebar() {
  const isAdmin = localStorage.getItem('isAdmin') === '1';
  const iscallcenter = localStorage.getItem('isCallCenter') === '1';
  // const isAdmin = true; // For testing purposes, you can set this to true
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
            <NavLink to="/admin/memberlist" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaUsers /> <span>Internal User List</span>
            </NavLink>
          </li>
           <li>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </li>
          
          </>:<> 
          {iscallcenter ? <>
         <li className="menu-group-title">
            <NavLink to="/userlist" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaUsers /> <span>User List</span>
            </NavLink>
          </li>
          <li className="menu-group-title">
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
          <NavLink  className="not-clickable">
            <FaTachometerAlt /> <span>Your VIRON Username:<br/>{username}</span>
          </NavLink>
        </li>

        <li>
          <NavLink href={`https://viron.network/${username}`} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2", textDecoration: "underline" }}>
            <FaTachometerAlt />
            <span>
              Your VIRON Referral Link:<br />
              viron.network/{username}
            </span>
          </NavLink>
        </li>

        <li>&nbsp;</li>
        <li className="menu-group-title">INFORMATION & RESOURCES:</li>
        <li>
          <NavLink to="/expectations-of-viron" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaDotCircle /> <span>EXPECTATIONS of VIRON</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/core-perspective-of-viron" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaDotCircle /> <span>Core Perspective of VIRON</span>
          </NavLink>
        </li>
        
        <li className="menu-group-title">MLM COMPANY INFORMATION:</li>
        <li>
          <NavLink to="/mlm-qualifications" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaDotCircle /> <span>MLM Company Qualifications</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/why-save-club" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaDotCircle /> <span>Why SAVE CLUB (“SC”) is Qualified</span>
          </NavLink>
        </li>
        <li className='p-line'></li>
        <li>
          <NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaQuestionCircle /> <span>Frequently Asked Questions (FAQ)</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/earnings-disclaimers" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaDotCircle /> <span>Earnings Disclaimers</span>
          </NavLink>
        </li>
        <li>&nbsp;</li>
        <li>
          <NavLink to="/edit-account" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaCog /> <span><strong style={{fontSize:'16px'}}>Edit Your Account Information</strong></span>
          </NavLink>
        </li>
        <li className='text-center'>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </li>
          </>
          }
          </>
          
        }
        
      </ul>
    </aside>
  );
}

export default Sidebar;
