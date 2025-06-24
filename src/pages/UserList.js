import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Layout from '../components/Layout';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './UserList.css'; // <- Add this
import { ADMIN_BASE_URL } from './config';
import './TransactionPopup.css';
import { FaTrash } from 'react-icons/fa';
import CustomModal from './CustomModal';


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
  const [searchText, setSearchText] = useState('');
  const gridRef = React.useRef();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);


  const handleRowClick = (data) => {
    debugger
    setSelectedRowData(data);
    setShowModal(true);
  };

  const handleView = (transaction, userId, canConfirm) => {
    setPopupTransaction(transaction);
    setPopupUserId(userId);
    setPopupCanConfirm(canConfirm);
    setPopupOpen(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${ADMIN_BASE_URL}/adminapi/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert('User deleted successfully.');
        setLoading(true);
        fetch(`${ADMIN_BASE_URL}/adminapi/users`)
          .then(res => res.json())
          .then(data => {
            setUsers(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        alert(result.message || 'Failed to delete user.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
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


  // useEffect(() => {
  //   fetch(`${ADMIN_BASE_URL}/adminapi/users`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       setUsers(data);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);
  useEffect(() => {
    fetch(`${ADMIN_BASE_URL}/adminapi/users`)
      .then(res => res.json())
      .then(data => {
        // alert("all users: " + JSON.stringify(data));
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!fromDate && !toDate) {
      setFilteredUsers(users);
      return;
    }

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const result = users.filter(user => {
      if (!user.user_created_at) return false;
      const createdDate = new Date(user.user_created_at);
      if (from && createdDate <= from) return false;
      if (to && createdDate >= to) return false;
      return true;
    });

    setFilteredUsers(result);
  }, [fromDate, toDate, users]);

  const handleExportByDateRange = () => {
    if (gridRef.current?.api) {
      const csv = gridRef.current.api.getDataAsCsv({
        onlySelected: false,
        allColumns: true,
      });

      // Download manually
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'users-list.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };




  const columnDefs = [
    {
      headerName: "User Name",
      field: "user_name",
      flex: 1,
      minWidth: 150,
      cellRenderer: (params) => {
        return (
          <div
            onClick={(e) => {
              handleRowClick(params.data);
            }}
          >
            {params.value}
          </div>
        );
      }
    },
    { headerName: "First Name", field: "first_name", flex: 1, minWidth: 150 },
    { headerName: "Last Name", field: "last_name", flex: 1, minWidth: 150 },
    { headerName: "Phone", field: "phone_number", flex: 1, minWidth: 150 },
    { headerName: "Email", field: "email", flex: 1, minWidth: 150 },
    {
      headerName: "Created Date",
      field: "user_created_at",
      filter: "agDateColumnFilter",
      sortable: true,
      flex: 1,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "—",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const cellDate = new Date(cellValue);
          const cellDateOnly = new Date(
            cellDate.getFullYear(),
            cellDate.getMonth(),
            cellDate.getDate()
          );
          if (cellDateOnly < filterLocalDateAtMidnight) return -1;
          if (cellDateOnly > filterLocalDateAtMidnight) return 1;
          return 0;
        },
        browserDatePicker: true,
      },
      minWidth: 150
    },
    {
      headerName: "Referred By",
      field: "user_refer_id",
      flex: 1,
      minWidth: 180,
      valueGetter: params => {
        // Find the user whose id matches user_refer_id
        const allUsers = params.context?.allUsers || [];
        const referredUser = allUsers.find(u => u.id === params.data.user_refer_id);
        return referredUser ? referredUser.user_name : "";
      }
    },
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
      },
      minWidth: 150
    },
    {
      headerName: "Action",
      cellRenderer: (params) => {
        const { transaction, id, is_confirmation } = params.data;
        return (
          <>
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
            {/* <h1> </h1> */}
            <button
              className="delete-btn"
              style={{ marginLeft: 8 }}
              onClick={() => params.context.handleDelete(id)}
              title="Delete User"
            >
              <FaTrash />
            </button>


          </>
        );
      },
      width: 170,
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
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: '24px',
                fontFamily: 'Segoe UI, sans-serif',
              }}
            >
              {/* Search Input */}
              <div style={{ flexGrow: 1, maxWidth: 300 }}>
                <label
                  htmlFor="search"
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontSize: 14,
                    color: '#37474f',
                    fontWeight: 600,
                  }}
                >
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={e => {
                    setSearchText(e.target.value);
                    if (gridRef.current?.api?.setQuickFilter) {
                      gridRef.current.api.setQuickFilter(e.target.value);
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: '1.5px solid #90a4ae',
                    fontSize: 15,
                    outline: 'none',
                  }}
                />
              </div>

              {/* From Date */}
              <div>
                <label
                  htmlFor="fromDate"
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontSize: 14,
                    color: '#37474f',
                    fontWeight: 600,
                  }}
                >
                  From
                </label>
                <input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: '1.5px solid #90a4ae',
                    fontSize: 15,
                    width: 180,
                    outline: 'none',
                  }}
                />
              </div>

              {/* To Date */}
              <div>
                <label
                  htmlFor="toDate"
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    fontSize: 14,
                    color: '#37474f',
                    fontWeight: 600,
                  }}
                >
                  To
                </label>
                <input
                  id="toDate"
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: '1.5px solid #90a4ae',
                    fontSize: 15,
                    width: 180,
                    outline: 'none',
                  }}
                />
              </div>

              {/* Export Button */}
              <div>
                <label style={{ display: 'block', marginBottom: 6, opacity: 0 }}>Export</label>
                <button
                  onClick={handleExportByDateRange}
                  style={{
                    padding: '11px 20px',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: 'pointer',
                    width: 120,
                  }}
                >
                  Export
                </button>
              </div>
            </div>



            <AgGridReact
              ref={gridRef}
              onGridReady={params => {
                gridRef.current = params;
              }}
              quickFilterText={searchText}
              theme="legacy"
              rowData={filteredUsers}
              columnDefs={columnDefs}
              pagination={true}
              animateRows={true}
              paginationPageSize={50}
              suppressHorizontalScroll={false}
              suppressRowClickSelection={true}
              rowSelection="single"
              domLayout="autoHeight"
              context={{
                handleView,
                handleDelete,
                allUsers: users,
              }}
            //onRowClicked={(event) => handleRowClick(event.data)}

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
      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={selectedRowData}
      />
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
        <p><strong>Transaction Type:</strong> {transaction?.type || "—"}</p>
        <p><strong>Transaction ID#:</strong> {transaction?.value || "—"}</p>
        <p>
          <strong>Transaction Time/Date:</strong>{' '}
          {transaction?.created_at
            ? new Date(transaction.created_at).toLocaleString()
            : '—'}
        </p>


        {isPaid && (
          <div className="referral-section">
            <h4 className="referral-title">Designated Sponsor (DS) Assigned</h4>
            <div style={{ marginTop: 20 }}>

              {/* <h4>Referred By</h4> */}
              {currentUser?.user_refer_id ? (
                <div className="referral-card">
                  <div className="referral-field">
                    <span className="label">VIRON Username:</span>
                    <span className="value">{referredUser?.user_name}</span>
                  </div>
                  <div className="referral-field">
                    <span className="label">User Email:</span>
                    <span className="value">{referredUser?.email}</span>
                  </div>
                  <div className="referral-field">
                    <span className="label">First Name:</span>
                    <span className="value">{referredUser?.first_name}</span>
                  </div>
                  <div className="referral-field">
                    <span className="label">Last Name:</span>
                    <span className="value">{referredUser?.last_name}</span>
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
                      .filter(u => (u.id !== currentUser.id && u.is_confirmation === 1))
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
            <button className="confirm-btn" onClick={onConfirm}>Payment Confirmed</button>
          )}
          <button className="close-btn" onClick={onClose} style={{ marginLeft: 10 }}>Close</button>
        </div>
      </div>
    </div>
  );
};