import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Layout from '../components/Layout';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './UserList.css'; // <- Add this
import { ADMIN_BASE_URL } from './config';
import './TransactionPopup.css';
import { FaTrash } from 'react-icons/fa';
import CustomModal from './CustomModal';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';


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
  const [manualConfirmOpen, setManualConfirmOpen] = useState(false);
  const [manualConfirmUserId, setManualConfirmUserId] = useState(null);
  // Inside TransactionPopup component


  const handleRowClick = (data) => {
    debugger
    setSelectedRowData(data);
    setShowModal(true);
  };

  const handleConfirmManual = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${ADMIN_BASE_URL}/adminapi/users/${userId}/confirm`,
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
        toast.success('User payment manually confirmed.');
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
        toast.error(result.message || 'Failed to confirm payment.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    }
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

      if (from) {
        const fromStart = new Date(from);
        fromStart.setHours(0, 0, 0, 0);
        if (createdDate < fromStart) return false;
      }

      if (to) {
        const toEnd = new Date(to);
        toEnd.setHours(23, 59, 59, 999);
        if (createdDate > toEnd) return false;
      }

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
      headerName: "Member ID",
      valueGetter: params => (params.node.rowIndex + 1).toString().padStart(4, '0'),
      flex: 1,
      minWidth: 130,
      cellStyle: { textAlign: 'center' },
    },

    {
      headerName: "User Name",
      field: "user_name",
      flex: 1,
      minWidth: 150,
      cellRenderer: (params) => {
        return (
          <span
            onClick={() => handleRowClick(params?.data)}
            style={{
              color: '#1976d2',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            title="View Details"
          >
            {params.value}
          </span>
        );
      }
    },
    { headerName: "First Name", field: "first_name", flex: 1, minWidth: 150 },
    { headerName: "Last Name", field: "last_name", flex: 1, minWidth: 150 },
    {
      headerName: "Phone",
      field: "phone_number",
      flex: 1,
      minWidth: 150,
      cellRenderer: (params) => {
        const handleCopy = () => {
          navigator.clipboard.writeText(params.value);
          toast.success("Copied to clipboard!");
        };

        return (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>{params.value}</span>
            <button
              onClick={handleCopy}
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                border: "none",
                background: "none"
              }}
              title='Copy'
            >
              <FiCopy size={15} color="#333" />
            </button>
          </div>
        );
      }

    },
    {
      headerName: "Email",
      field: "email",
      flex: 1,
      minWidth: 250,
      cellRenderer: (params) => {
        const handleCopy = () => {
          navigator.clipboard.writeText(params.value);
          toast.success("Copied to clipboard!");
        };

        return (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>{params.value}</span>
            <button
              onClick={handleCopy}
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                border: "none",
                background: "none"
              }}
              title='Copy'
            >
              <FiCopy size={15} color="#333" />
            </button>
          </div>
        );
      }
    },
    {
      headerName: "Created Date",
      field: "user_created_at",
      filter: "agDateColumnFilter",
      sortable: true,
      flex: 1,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }) : "—",
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
      headerName: "Quantity Referred",
      field: "referral_count",
      flex: 1,
      minWidth: 120,
      valueGetter: params => {
        const allUsers = params.context?.allUsers || [];
        // Count users whose user_refer_id matches this user's id
        return allUsers.filter(u => u.user_refer_id === params.data.id).length;
      },
      cellStyle: { textAlign: 'center', fontWeight: 600 },
    },
    {
      headerName: "DS Sponsor",
      field: "ds_id",
      flex: 1,
      minWidth: 180,
      valueGetter: params => {
        // Find the user whose id matches ds_id
        const allUsers = params.context?.allUsers || [];
        const dsUser = allUsers.find(u => u.id === params.data.ds_id);
        return dsUser ? dsUser.user_name : "";
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
        const { transaction, id, is_confirmation, ds_id } = params.data;
        let paymentStatus = "Not Paid";
        if ( is_confirmation === 1) paymentStatus = "Paid";
        else if (transaction && is_confirmation !== 1) paymentStatus = "Need Verify";

        let btnText = "View";
        let btnColor = "#1976d2";
        let disabled = false;

        if (paymentStatus === "Paid") {
          if (ds_id != null && ds_id !== 0) {
            btnText = "DS Assigned";
            btnColor = "#808080";

          } else {
            btnText = "Assign DS";
            btnColor = "#43e97b";
          }
        } else if (paymentStatus === "Need Verify") {
          btnText = "Verify";
          btnColor = "#ff9800";
        } else {
          if (paymentStatus === "Not Paid") {
            btnText = "Not Paid";
            btnColor = "#e53935";
            // disabled = true; // Remove this line
          }
        }
        return (
          <>
            <button
              className="view-btn"
              style={{
                background: btnColor,
                width: "120px",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "7px 18px",
                fontWeight: 600,
                fontSize: 15,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.7 : 1,
              }}
              onClick={() => {
                if (paymentStatus === "Not Paid") {
                  setManualConfirmUserId(id);
                  setManualConfirmOpen(true);
                } else if (!disabled) {
                  params.context.handleView(
                    transaction,
                    id,
                    !!transaction && is_confirmation !== 1
                  );
                }
              }}
              disabled={disabled}
            >
              {btnText}
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
      width: 230,
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
      {manualConfirmOpen && (
        <div className="popup-overlay">
          <div className="popup-content" style={{ maxWidth: 400 }}>
            <h3>Manual Payment Confirmation</h3>
            <p>Do you want to manually confirm the payment for this user?</p>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <button
                style={{
                  background: "#43e97b",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 24px",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onClick={async () => {
                  // Call your manual confirm API here
                  await handleConfirmManual(manualConfirmUserId);
                  setManualConfirmOpen(false);
                }}
              >
                Yes
              </button>
              <button
                style={{
                  background: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 24px",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onClick={() => setManualConfirmOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
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
  const [editMode, setEditMode] = useState(false);

  // alert("currentUser: " + JSON.stringify(allUsers));

  useEffect(() => {
    setSelectedReferId('');
    if (!open) {
      setEditMode(false);
    }
  }, [open]);

  if (!open) return null;

  const isPaid = transaction && currentUser?.is_confirmation === 1;


  // Find the referred user if user_refer_id is set
  const referredUser = allUsers?.find(u => u.id === currentUser?.ds_id);
  // alert("referredUser: " + JSON.stringify(referredUser)); 

  return (

    <div className="popup-overlay">
      <div className="popup-content">
        <div className="referral-section">
          <h4 className="referral-title">User Information</h4>
          <div className="referral-details">
            <div className="referral-field">
              <span className="label">VIRON Username:</span>
              <span className="value">{currentUser?.user_name}</span>
            </div>

            <div className="referral-field">
              <span className="label">First Name:</span>
              <span className="value">{currentUser?.first_name}</span>
            </div>
            <div className="referral-field">
              <span className="label">Last Name:</span>
              <span className="value">{currentUser?.last_name}</span>
            </div>
            <div className="referral-field">
              <span className="label">User Email:</span>
              <span className="value">{currentUser?.email}</span>
            </div>
          </div>
        </div>

        <h3>Transaction Details</h3>
        <p><strong>Transaction Type:</strong> {transaction?.type || "—"}</p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 8,
          maxWidth: 800, // or your popup width
          flexWrap: 'wrap'
        }}>
          <strong style={{ minWidth: 140 }}>Transaction ID#:</strong>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              marginRight: 8,
              maxWidth: 720,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              wordBreak: 'break-all',
              verticalAlign: 'middle'
            }}
            title={transaction?.value}
          >
            {transaction?.value || "—"}
          </span>
          {transaction?.value && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(transaction.value);
                toast.success("Transaction ID copied!");
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 4,
              }}
              title="Copy Transaction ID"
            >
              <FiCopy size={16} color="#1976d2" />
            </button>
          )}
        </div>
        <p>
          <strong>Transaction Time/Date:</strong>{' '}
          {transaction?.created_at
            ? new Date(transaction.created_at).toLocaleString()
            : '—'}
        </p>


        {isPaid && (
          <div className="referral-section">
            <h4 className="referral-title">DESIGNATED SPONSOR (DS) Assigned</h4>
            <div style={{ marginTop: 20 }}>

              {/* <h4>Referred By</h4> */}
              {currentUser?.ds_id && !editMode ? (
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
                  <button
                    style={{
                      background: "#43e97b",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "7px 18px",
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: "pointer",
                      // opacity: disabled ? 0.7 : 1,
                    }}
                    className="edit-btn"
                    // style={}
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
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
                      .filter(u => (u.id !== currentUser.id && u.is_confirmation === 1 && u.ds_count < 2))
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
                  {currentUser?.ds_id && (
                    <button
                      className="close-btn"
                      style={{ marginLeft: 10 }}
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          {canConfirm && (
            <button className="confirm-btn-verify" onClick={onConfirm}>Verify Payment</button>
          )}
          <button className="close-btn" onClick={onClose} style={{ marginLeft: 10 }}>Close</button>
        </div>
      </div>
    </div>
  );
};