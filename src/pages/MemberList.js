// Import statements remain unchanged
import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Layout from '../components/Layout';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ADMIN_BASE_URL } from './config';
import './UserList.css'
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa'; // Add FaEye, FaEyeSlash


function MemberList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [editUser, setEditUser] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [addForm, setAddForm] = useState({
        user_name: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        is_admin: 0,
        is_callcenter: 0,
    });

    const [editForm, setEditForm] = useState({
        user_name: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        is_admin: 0,
        is_callcenter: 0,
    });

    const gridRef = useRef(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        fetch(`${ADMIN_BASE_URL}/adminapi/users/admin-or-callcenter`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const response = await fetch(`${ADMIN_BASE_URL}/adminapi/user/${userId}`, { method: 'DELETE' });
            const result = await response.json();
            if (response.ok) {
                alert('User deleted successfully.');
                fetchUsers();
            } else {
                alert(result.message || 'Failed to delete user.');
            }
        } catch {
            alert('Network error. Please try again.');
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setEditForm({
            user_name: user.user_name || '',
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            phone_number: user.phone_number || '',
            email: user.email || '',
            is_admin: user.is_admin || 0,
            is_callcenter: user.is_callcenter || 0,
        });
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${ADMIN_BASE_URL}/adminapi/user/${editUser.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });
            const result = await response.json();
            if (response.ok) {
                alert('User updated successfully.');
                setEditUser(null);
                fetchUsers();
            } else {
                alert(result.message || 'Failed to update user.');
            }
        } catch {
            alert('Network error. Please try again.');
        }
    };

    const handleAddFormChange = (e) => {
        const { name, value } = e.target;
        setAddForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${ADMIN_BASE_URL}/adminapi/users`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addForm),
            });
            const result = await response.json();
            if (response.ok) {
                alert('User added successfully.');
                setShowAddForm(false);
                setAddForm({
                    user_name: '',
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    email: '',
                    password: '',
                    is_admin: 0,
                    is_callcenter: 0,
                });
                fetchUsers();
            } else {
                alert(result.message || 'Failed to add user.');
            }
        } catch {
            alert('Network error. Please try again.');
        }
    };

    const columnDefs = [
        { headerName: "User Name", field: "user_name", flex: 1,  minWidth: 130, },
        { headerName: "First Name", field: "first_name", flex: 1 ,  minWidth: 130,},
        { headerName: "Last Name", field: "last_name", flex: 1 ,  minWidth: 130,},
        { headerName: "Phone", field: "phone_number", flex: 1,  minWidth: 130, },
        { headerName: "Email", field: "email", flex: 1 ,  minWidth: 130,},
        
        {
            headerName: "Type",
            field: "type",
            flex: 1,
            valueGetter: (params) => {
                if (params.data.is_admin) return 'Admin';
                if (params.data.is_callcenter) return 'Callcenter';
                return 'User';
            },
         
      minWidth: 130,
        },
        {
            headerName: "Actions",
            field: "actions",
            flex: 1,
            minWidth: 150,
            cellRenderer: (params) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(params.data)} style={iconBtnStyle('#1976d2')}><FaEdit /></button>
                    <button onClick={() => handleDelete(params.data.id)} style={iconBtnStyle('#e74c3c')}><FaTrash /></button>
                </div>
            ),
        },
    ];

    // const inputField = (label, name, type, value, onChange, required = false) => (
    //     <label>
    //         {label}
    //         <input
    //             type={type}
    //             name={name}
    //             value={value}
    //             onChange={onChange}
    //             required={required}
    //             style={inputStyle}
    //         />
    //     </label>
    // );

    const inputField = (label, name, type, value, onChange, required = false) => {
        if (name === "password") {
            return (
                <label style={{ position: 'relative' }}>
                    {label}
                    <input
                        type={showPassword ? "text" : "password"}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        style={{ ...inputStyle}}
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            // transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#888',
                            fontSize: 18,
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </label>
            );
        }
         return (
            <label>
                {label}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    style={inputStyle}
                />
            </label>
        );
    }

        return (
            <Layout>
                <div className="userlist-container" style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Internal User List</h2>
                        <button onClick={() => setShowAddForm(true)} style={addBtnStyle}><FaPlus /> Add User</button>
                    </div>

                    <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            if (gridRef.current && gridRef.current.setQuickFilter) {
                                gridRef.current.setQuickFilter(e.target.value);
                            }
                        }}
                        style={searchStyle}
                    />

                    <div className="ag-theme-alpine" style={{ width: '100%', maxWidth: 1100 }}>
                        <AgGridReact
                            ref={gridRef}
                            rowData={users}
                            quickFilterText={searchText}
                            columnDefs={columnDefs}
                            theme='legacy'
                            pagination={true}
                            paginationPageSize={50}
                            animateRows={true}
                            domLayout="autoHeight"
                        />
                    </div>

                    {showAddForm && (
                        <Modal onClose={() => setShowAddForm(false)} title="Add User" onSubmit={handleAddFormSubmit}>
                            {inputField("Username", "user_name", "text", addForm.user_name, handleAddFormChange, true)}
                            {inputField("First Name", "first_name", "text", addForm.first_name, handleAddFormChange, true)}
                            {inputField("Last Name", "last_name", "text", addForm.last_name, handleAddFormChange, true)}
                            {inputField("Phone Number", "phone_number", "text", addForm.phone_number, handleAddFormChange)}
                            {inputField("Email", "email", "email", addForm.email, handleAddFormChange, true)}
                            {inputField("Password", "password", "password", addForm.password, handleAddFormChange, true)}
                            <RoleSelectField
                                value={addForm.is_admin ? 'admin' : addForm.is_callcenter ? 'callcenter' : ''}
                                onChange={({ is_admin, is_callcenter }) => setAddForm(prev => ({ ...prev, is_admin, is_callcenter }))}
                            />
                        </Modal>
                    )}

                    {editUser && (
                        <Modal onClose={() => setEditUser(null)} title="Edit User" onSubmit={handleEditFormSubmit}>
                            {inputField("Username", "user_name", "text", editForm.user_name, handleEditFormChange, true)}
                            {inputField("First Name", "first_name", "text", editForm.first_name, handleEditFormChange, true)}
                            {inputField("Last Name", "last_name", "text", editForm.last_name, handleEditFormChange, true)}
                            {inputField("Phone Number", "phone_number", "text", editForm.phone_number, handleEditFormChange)}
                            {inputField("Email", "email", "email", editForm.email, handleEditFormChange, true)}
                            <RoleSelectField
                                value={editForm.is_admin ? 'admin' : editForm.is_callcenter ? 'callcenter' : ''}
                                onChange={({ is_admin, is_callcenter }) => setEditForm(prev => ({ ...prev, is_admin, is_callcenter }))}
                            />
                        </Modal>
                    )}
                </div>
            </Layout>
        );
    }

    const Modal = ({ children, onClose, title, onSubmit }) => (
        <div style={modalOverlay} onClick={onClose}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit} style={modalBox}>
                <h3>{title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
                    <button type="submit" style={submitButtonStyle('#1976d2', '#fff')}>Submit</button>
                    <button type="button" onClick={onClose} style={submitButtonStyle('#e0e0e0', '#333')}>Cancel</button>
                </div>
            </form>
        </div>
    );

    const RoleSelectField = ({ value, onChange }) => (
        <label>
            Role
            <select
                value={value}
                onChange={(e) => {
                    const selected = e.target.value;
                    onChange({
                        is_admin: selected === 'admin' ? 1 : 0,
                        is_callcenter: selected === 'callcenter' ? 1 : 0,
                    });
                }}
                required
                style={inputStyle}
            >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="callcenter">Callcenter</option>
            </select>
        </label>
    );

    const inputStyle = {
        width: '100%',
        padding: 8,
        borderRadius: 6,
        border: '1.5px solid #90a4ae',
    };

    const submitButtonStyle = (bg, color) => ({
        padding: '10px 24px',
        backgroundColor: bg,
        color,
        border: 'none',
        borderRadius: 6,
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
    });

    const addBtnStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        padding: '10px 18px',
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
    };

    const iconBtnStyle = (color) => ({
        background: 'none',
        border: 'none',
        color,
        cursor: 'pointer',
        fontSize: '16px',
    });

    const searchStyle = {
        maxWidth: 300,
        margin: '16px 0',
        padding: '10px 14px',
        borderRadius: 6,
        border: '1.5px solid #90a4ae',
        fontSize: 15,
    };

    const modalOverlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    };

    const modalBox = {
        background: '#fff',
        padding: 32,
        borderRadius: 10,
        minWidth: 350,
        maxWidth: 400,
        width: '90%',
        boxShadow: '0 8px 32px rgba(44,62,80,0.18)',
        display: 'flex',
        flexDirection: 'column',
    };

    export default MemberList;
