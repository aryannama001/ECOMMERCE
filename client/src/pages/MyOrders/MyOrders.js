import React, { useEffect } from 'react'
import './MyOrders.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../../features/orderSlice';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { myOrders, loading, error } = useSelector(state => state.myOrders)
    useEffect(() => {
        dispatch(getMyOrders());

    }, [dispatch])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.row.id}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    myOrders &&
        myOrders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    return (
        <div className='h-screen' >

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight />
        </div>
    )
}

export default MyOrders