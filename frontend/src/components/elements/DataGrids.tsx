import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

interface DatagridProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    selectable?: boolean;
}



const DataGrids: React.FC<DatagridProps> = ({ columns, rows, selectable }) => {

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                checkboxSelection={selectable ? selectable : false}
            
            />
        </div>
    );
};

export default DataGrids;
