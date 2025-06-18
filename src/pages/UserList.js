import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Layout from '../components/Layout';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './UserList.css'; // <- Add this
import { ADMIN_BASE_URL } from './config';
import './TransactionPopup.css';


import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);



function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTransaction, setPopupTransaction] = useState(null);
  const [popupUserId, setPopupUserId] = useState(null);
  const [popupCanConfirm, setPopupCanConfirm] = useState(false);
  const [savingRefer, setSavingRefer] = useState(false);

  const handleView = (transaction, userId, canConfirm) => {
    setPopupTransaction(transaction);
    setPopupUserId(userId);
    setPopupCanConfirm(canConfirm);
    setPopupOpen(true);
  };

  const handleSaveRefer = async (referId) => {
    setSavingRefer(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${ADMIN_BASE_URL}/adminapi/users/${popupUserId}/refer`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userReferId: referId }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert('Referral saved successfully.');
        setPopupOpen(false);
        // Refresh user list
        setLoading(true);
        fetch(`${ADMIN_BASE_URL}/adminapi/users`)
          .then(res => res.json())
          .then(data => {
            setUsers(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        alert(result.message || 'Failed to save referral.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
    setSavingRefer(false);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${ADMIN_BASE_URL}/adminapi/users/${popupUserId}/confirm`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert('User confirmed successfully.');
        setPopupOpen(false);
        // Optionally refresh user list
        setLoading(true);
        fetch(`${ADMIN_BASE_URL}/adminapi/users`)
          .then(res => res.json())
          .then(data => {
            setUsers(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        alert(result.message || 'Failed to confirm user.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };


  useEffect(() => {
    fetch(`${ADMIN_BASE_URL}/adminapi/users`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const columnDefs = [
    { headerName: "#", valueGetter: "node.rowIndex + 1", width: 80 },
    { headerName: "First Name", field: "first_name", flex: 1 },
    { headerName: "Last Name", field: "last_name", flex: 1 },
    { headerName: "Phone", field: "phone_number", flex: 1 },
    { headerName: "Email", field: "email", flex: 1 },
    {
      headerName: "Payment Status",
      field: "payment_status",
      flex: 1,
      valueGetter: (params) => {
        const { transaction, is_confirmation } = params.data;
        console.log("Transaction:", transaction, "Confirmation Status:", is_confirmation);
        if (transaction && is_confirmation === 1) return "Paid";
        if (transaction && is_confirmation !== 1) return "Need Verify";
        return "Not Paid";
      },
      cellStyle: params => {
        const status = params.value;
        if (status === "Paid") return { color: "#43e97b", fontWeight: 700 };
        if (status === "Need Verify") return { color: "#ff9800", fontWeight: 700 };
        return { color: "#e53935", fontWeight: 700 };
      }
    },
    {
      headerName: "Action",
      cellRenderer: (params) => {
        const { transaction, id, is_confirmation } = params.data;
        return (
          <button
            className="view-btn"
            onClick={() =>
              params.context.handleView(
                transaction,
                id,
                !!transaction && is_confirmation !== 1
              )
            }
          >
            View
          </button>
        );
      },
      width: 130,
    },
  ];


  return (
    <Layout>
      <div className="userlist-container">
        <h2 className="userlist-heading">User List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="ag-theme-alpine" style={{ width: '100%' }}>
            <AgGridReact
              rowData={users}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={15}
              domLayout="autoHeight"
              context={{
                handleView,
              }}
            />
          </div>
        )}
        <TransactionPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          transaction={popupTransaction}
          onConfirm={handleConfirm}
          canConfirm={popupCanConfirm}
          allUsers={users}
          currentUser={users.find(u => u.id === popupUserId)}
          onSaveRefer={handleSaveRefer}
          savingRefer={savingRefer}
        />
      </div>
    </Layout>
  );

}

export default UserList;


const TransactionPopup = ({
  open,
  onClose,
  transaction,
  onConfirm,
  canConfirm,
  allUsers,
  currentUser,
  onSaveRefer,
  savingRefer,
}) => {
  const [selectedReferId, setSelectedReferId] = useState('');
  // alert("currentUser: " + JSON.stringify(allUsers));

  useEffect(() => {
    setSelectedReferId('');
  }, [open]);

  if (!open) return null;

  const isPaid = transaction && currentUser?.is_confirmation === 1;

  // Find the referred user if user_refer_id is set
  const referredUser = allUsers?.find(u => u.id === currentUser?.user_refer_id);
  // alert("referredUser: " + JSON.stringify(referredUser)); 

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Transaction Details</h3>
        <p><strong>Type:</strong> {transaction?.type || "—"}</p>
        <p><strong>Value:</strong> {transaction?.value || "—"}</p>
        {isPaid && (
          <div className="referral-section">
            <h4 className="referral-title">Designated Sponsor (DS) Assigned</h4>
            <div style={{ marginTop: 20 }}>

              {/* <h4>Referred By</h4> */}
              {currentUser?.user_refer_id ? (
                <div className="referral-card">
                  <div className="referral-field">
                    <span className="label">VIRON Username:</span>
                    <span className="value">{referredUser.user_name}</span>
                  </div>
                  <div className="referral-field">
                    <span className="label">User Email:</span>
                    <span className="value">{referredUser.email}</span>
                  </div>
                  <div className="referral-field">
                    <span className="label">First Name:</span>
                    <span className="value">{referredUser.first_name}</span>
                  </div>
                  <div className="referral-field">
                    <span className="label">Last Name:</span>
                    <span className="value">{referredUser.last_name}</span>
                  </div>
                </div>

              ) : (
                <>
                  <select
                    value={selectedReferId}
                    onChange={e => setSelectedReferId(e.target.value)}
                    style={{ padding: 8, borderRadius: 6, width: '100%', marginBottom: 10 }}
                  >
                    <option value="">Select Designated Sponsor</option>
                    {allUsers
                      .filter(u =>(u.id !== currentUser.id&& u.is_confirmation === 1))
                      .map(u => (
                        <option key={u.id} value={u.id}>
                          {u.user_name} ({u.email})
                        </option>
                      ))}
                  </select>
                  <button
                    className="confirm-btn"
                    onClick={() => onSaveRefer(selectedReferId)}
                    disabled={!selectedReferId || savingRefer}
                  >
                    {savingRefer ? "Saving..." : "Save Designated Sponsor"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          {canConfirm && (
            <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
          )}
          <button className="close-btn" onClick={onClose} style={{ marginLeft: 10 }}>Close</button>
        </div>
      </div>
    </div>
  );
};