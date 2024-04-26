

import { useState, useEffect } from 'react';
import DataGrid from '@/components/elements/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import Button from '@/components/elements/Button';
import PopupDialog from '@/components/elements/PopupDialog';
import { getFeeds, addFeed, deleteFeed, updateFeed } from '@/middlewares/rss';

interface RssFeed {
    id?: string;
    name: string;
    url: string;
    active: boolean;
}

const AdminRSSFeed: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [initialData, setInitialData] = useState<RssFeed | null>(null);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'url', headerName: 'Url', width: 400 },
        { field: 'active', headerName: 'Active', width: 130 },
        { field: 'delete', headerName: '', width: 130, renderCell: (params) => <Button name="Delete" color='bg-red-500' onClick={() => { handleDelete(params.row.id); }} type={undefined} /> },
        { field: 'edit', headerName: '', width: 130, renderCell: (params) => <Button name="Edit" color='bg-bluePrimary' onClick={() => { handleOpenEdit(params.row); }} type={undefined} /> }
    ];

    const [rows, setRows] = useState<RssFeed[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const feeds = await getFeeds();
            setRows(feeds);
        };

        fetchData();
    }, []);


    const handleClose = () => {
        isEditMode;
        setOpen(false);
        setIsEditMode(false);
        setInitialData(null);

    };

    const handleOpenAdd = () => {
        setIsEditMode(false);
        setOpen(true);
    };

    const handleOpenEdit = (data: RssFeed ) => {
        setOpen(true);
        setIsEditMode(true);
        setInitialData({
            id: data.id,
            name: data.name,
            url: data.url,
            active: data.active
        });
    };

    const handleAdd = (data:  RssFeed) => {
        addFeed(data);
        window.location.reload();
    };

    const handleEdit = (data: RssFeed) => {
        updateFeed(data);
        window.location.reload();
    };

    const handleDelete = (id: string) => {
        deleteFeed(id);
        window.location.reload();
    }



    return (

        <div style={{ height: "100%" }}>
            <div style={{ display: 'flex', margin: "20px 30px 20px 30px" }}>
                <Button
                    name="Add"
                    color='bg-bluePrimary mr-2'
                    onClick={() => { handleOpenAdd(); }}
                    type={undefined} />
            </div>
            <div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                /></div>
            <PopupDialog open={open}
                handleClose={handleClose}
                initialData={initialData}
                handleAdd={handleAdd}
                handleEdit={handleEdit} />
        </div>
    );
};

export default AdminRSSFeed;
