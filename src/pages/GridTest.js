import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const jj = [
  { id: 1, first_name: "John", last_name: "Doe", phone_number: "123456", email: "john@example.com" }
];

const columnDefs = [
  { headerName: "ID", field: "id" },
  { headerName: "First Name", field: "first_name" },
  { headerName: "Last Name", field: "last_name" },
  { headerName: "Phone", field: "phone_number" },
  { headerName: "Email", field: "email" }
];

function GridTest() {
  const [rowData] = useState(jj);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}

export default GridTest;
