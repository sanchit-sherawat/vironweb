import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import {
  FaTachometerAlt, FaUsers, FaSignOutAlt, FaQuestionCircle, FaCog,
  FaDotCircle, FaUser, FaExternalLinkAlt, FaBars, FaTimes
} from 'react-icons/fa';
import { MdOutlinePayments } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../pages/config';

function Sidebar({ isOpen, toggleSidebar }) {
  const isAdmin = localStorage.getItem('isAdmin') === '1';
  const iscallcenter = localStorage.getItem('isCallCenter') === '1';
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [referUserName, setReferUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/loginPage');
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/user-payment-status/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.paymentStatus) {
          setPaymentStatus(data.paymentStatus);
          setReferUserName(data.referUserName);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  return (
    <>
      
      <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <ul className="sidebar-menu">
          {isAdmin ? (
            <>
              <li className="disabled-link">
                    <div className="menu-item">
                      <FaUser /> <span>Your VIRON Username:<br />{username}</span>
                    </div>
                  </li>
              <li>
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
            </>
          ) : (
            <>
              {iscallcenter ? (
                <>
                   <li className="disabled-link">
                    <div className="menu-item">
                      <FaUser /> <span>Your VIRON Username:<br />{username}</span>
                    </div>
                  </li>
                  <li>
                    <NavLink to="/userlist" className={({ isActive }) => isActive ? 'active' : ''}>
                      <FaUsers /> <span>User List</span>
                    </NavLink>
                  </li>
                  <li>
                    <button className="logout-btn" onClick={handleLogout}>
                      <FaSignOutAlt /> <span>Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                      <FaTachometerAlt /> <span>Dashboard</span>
                    </NavLink>
                  </li>

                  <li className="disabled-link">
                    <div className="menu-item">
                      <FaUser /> <span>Your VIRON Username:<br />{username}</span>
                    </div>
                  </li>

                  <li>
                    <a href={`https://viron.network/${username}`} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt />
                      <span>Your VIRON Referral Link:<br />viron.network/{username}</span>
                    </a>
                  </li>

                  <li className="disabled-link">
                    <div className="menu-item">
                      <MdOutlinePayments />
                      <span>
                        Your VHB Account Status:{" "}
                        <span style={{
                          color:
                            paymentStatus === "Paid" ? "green" :
                            paymentStatus === "Not Paid" ? "red" :
                            paymentStatus === "Verification Pending" ? "#8b5d0e" : "black",
                          fontWeight: "bold",
                        }}>
                          {paymentStatus}
                        </span>
                      </span>
                    </div>
                  </li>

                  <li className="disabled-link">
                    <div className="menu-item">
                      <FaUser /> <span>Your SPONSOR Username: {referUserName}</span>
                    </div>
                  </li>

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
                  <li>
                    <NavLink to="/edit-account" className={({ isActive }) => isActive ? 'active' : ''}>
                      <FaCog /> <strong>Edit Your Account Information</strong>
                    </NavLink>
                  </li>

                  <li className="text-center">
                    <button className="logout-btn" onClick={handleLogout}>
                      <FaSignOutAlt /> <span>Logout</span>
                    </button>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
