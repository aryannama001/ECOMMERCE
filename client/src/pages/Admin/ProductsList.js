import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import './productList.css'
import { getAllAdminProducts } from '../../features/productsSlice';

const ProductsList = () => {

    const dispatch = useDispatch()

    const { products } = useSelector(state => state.adminProducts)

    useEffect(() => {
        dispatch(getAllAdminProducts())
    }, [dispatch])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 1 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 300,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
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
                        <Link to={`/admin/product/${params.row.id}`} > <FaEdit /> </Link>

                        <Button className='delete__icon'>
                            <MdDelete />
                        </Button>
                    </>
                );
            },

        },
    ];

    const rows = []

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });


    return (
        <div className='min-h-screen'>

            <div className='dashboard__container px-5'>
                <h1 className='text-center text-3xl font-medium text-blue-800 pt-5'>All Products</h1>

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