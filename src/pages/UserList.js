import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Layout from '../components/Layout';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './UserList.css'; // <- Add this
import { ADMIN_BASE_URL } from './config';

import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

const ConfirmButtonRenderer = (props) => {
  const handleConfirm = () => {
    alert(`Confirmed user: ${props.data.first_name} (ID: ${props.data.id})`);
  };

  return (
    <button className="confirm-btn">
      Confirm
    </button>
  );
};

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    { headerName: "#", valueGetter: "node.rowIndex + 1", width: 80 },
    { headerName: "First Name", field: "first_name", flex: 1 },
    { headerName: "Last Name", field: "last_name", flex: 1 },
    { headerName: "Phone", field: "phone_number", flex: 1 },
    { headerName: "Email", field: "email", flex: 1 },
    {
      headerName: "Action",
      cellRenderer: ConfirmButtonRenderer,
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
              paginationPageSize={10}
              domLayout="autoHeight"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default UserList;
