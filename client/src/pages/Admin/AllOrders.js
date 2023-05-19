import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { clearOrderStatus, deleteOrder, getAllOrders } from '../../features/orderSlice';

const ProductsList = () => {

    const dispatch = useDispatch()


    const { allOrders, isOrderDeleted } = useSelector(state => state.AllOrders)

    useEffect(() => {
        dispatch(getAllOrders())

        if (isOrderDeleted) {
            toast.success("Order Deleted")
            dispatch(clearOrderStatus())
        }


    }, [dispatch, isOrderDeleted])

    const handleDelete = (id) => {
        dispatch(deleteOrder(id))
    }

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 250,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "quantity",
            headerName: "Items Quantity",
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
            flex: 0.5,
            headerName: "Actions",
            minWidth: 200,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/orders/${params.row.id}`} > <FaEdit /> </Link>

                        <Button className='delete__icon' onClick={() => handleDelete(params.row.id)}>
                            <MdDelete />
                        </Button>
                    </>
                );
            },

        },
    ];

    const rows = []

    allOrders &&
        allOrders.forEach((item) => {
            rows.push({
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
                quantity: item.orderItems.length,
            });
        });


    return (
        <div className='min-h-screen'>

            <div className='dashboard__container px-5'>
                <h1 className='text-center text-3xl font-medium text-blue-800 pt-5'>All Orders</h1>

                <div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="AllProductsTable mt-10 "
                        autoHeight
                    />
                </div>
            </div>

        </div>
    )
}

export default ProductsList