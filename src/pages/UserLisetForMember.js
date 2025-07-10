import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Layout from '../components/Layout';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ADMIN_BASE_URL } from './config';
import CustomModal from './CustomModal';

function UserLisetForMember() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const gridRef = useRef();
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupTransaction, setPopupTransaction] = useState(null);
    const [popupUserId, setPopupUserId] = useState(null);
    const [savingRefer, setSavingRefer] = useState(false);
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
    const handleView = (transaction, userId) => {
        setPopupTransaction(transaction);
        setPopupUserId(userId);
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

    useEffect(() => {
        fetch(`${ADMIN_BASE_URL}/adminapi/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const columnDefs = [
        {
            headerName: "User Name",
            field: "user_name",
            flex: 1,
            minWidth: 150,
            cellRenderer: (params) => {
                return (
                    <span
                        onClick={() => handleRowClick(params.data)}
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
        { headerName: "Phone", field: "phone_number", flex: 1, minWidth: 150 },
        { headerName: "Email", field: "email", flex: 1, minWidth: 150 },
        {
            headerName: "Created Date",
            field: "user_created_at",
            filter: "agDateColumnFilter",
            sortable: true,
            flex: 1,
            valueFormatter: (params) =>
                params.value ? new Date(params.value).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
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
                const allUsers = users || [];
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
        // {
        //     headerName: "Action",
        //     cellRenderer: (params) => {
        //         const { transaction, id, is_confirmation } = params.data;
        //         return (
        //             <button
        //                 className="view-btn"
        //                 onClick={() =>
        //                     params.context.handleView(
        //                         transaction,
        //                         id,
        //                         !!transaction && is_confirmation !== 1
        //                     )
        //                 }
        //             >
        //                 View
        //             </button>
        //         );
        //     },
        //     width: 120,
        // },
    ];

    return (
        <Layout>
            <div className="userlist-container">
                <h2 className="userlist-heading">User List (Read Only)</h2>
                {loading ? (
                    <p class=" ">Loading...</p>
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
                            {/* <div>
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
                            </div> */}
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
                            domLayout="autoHeight"
                            context={{
                                handleView,
                                allUsers: users,
                            }}
                        />
                    </div>
                )}
                <TransactionPopup
                    open={popupOpen}
                    onClose={() => setPopupOpen(false)}
                    transaction={popupTransaction}
                    allUsers={users}
                    currentUser={users.find(u => u.id === popupUserId)}
                    onSaveRefer={handleSaveRefer}
                    savingRefer={savingRefer}
                />
                <CustomModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    data={selectedRowData}
                />
            </div>
        </Layout>
    );
}

export default UserLisetForMember;


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
                <p class=" "><strong>Transaction Type:</strong> {transaction?.type || "—"}</p>
                <p class=" "><strong>Transaction ID#:</strong> {transaction?.value || "—"}</p>
                <p class=" ">
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