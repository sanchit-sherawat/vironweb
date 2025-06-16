import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/home" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/admin/userlist" activeClassName="active">User List</NavLink>
        </li>
    
       
         <li>
          <NavLink to="/mlm-qualifications" activeClassName="active">MLM Company Qualifications</NavLink>
        </li>
        <li>
          <NavLink to="/why-save-club" activeClassName="active">Why SAVE CLUB (“SC”) is chosen</NavLink>
        </li>
         <li>
          <NavLink to="/faq" activeClassName="active">Frequently Asked Questions (FAQ)</NavLink>
        </li>
        <li>
          <NavLink to="/earnings-disclaimers" activeClassName="active">Earnings Disclaimers</NavLink>
        </li>
         <li>
          <NavLink to="/expectations-of-viron" activeClassName="active">Expectations of VIRON</NavLink>
        </li>
        <li>
          <NavLink to="/edit-account" activeClassName="active">Edit Account Information</NavLink>
        </li>
         
      </ul>
    </aside>
  );
}

export default Sidebar;
