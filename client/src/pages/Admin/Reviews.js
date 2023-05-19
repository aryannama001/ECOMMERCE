import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearDeleteReviewStatus, clearReviewError, deleteReview, getAllReviews } from '../../features/productSlice';
import { toast } from 'react-toastify';

const Reviews = () => {
    const dispatch = useDispatch()
    const [productId, setProductId] = useState("");

    const { reviews, error, isReviewDeleted } = useSelector(state => state.allReviews)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearReviewError());
        }
        if (isReviewDeleted) {
            toast.success("review deleted")
            dispatch(clearDeleteReviewStatus())
            dispatch(getAllReviews(productId))
        }
    }, [dispatch, error, isReviewDeleted])

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 1 },

        {
            field: "name",
            headerName: "User Name",
            minWidth: 300,
            flex: 1,
        },
        {
            field: "comment",
            headerName: "Comment",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "rating",
            headerName: "Rating",
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
                        <Button className='delete__icon' onClick={() => handleDelete(params.row.id)}>
                            <MdDelete />
                        </Button>
                    </>
                );
            },

        },
    ];

    const rows = []

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                comment: item.comment,
                rating: item.rating,
                name: item.name,
            });
        });

    const searchProductReviews = () => {

        dispatch(getAllReviews(productId))
    }

    const handleDelete = (id) => {
        dispatch(deleteReview({ productId, reviewId: id }))
    }

    return (
        <div className='dashboard__container px-5'>
            <div className='flex w-80 mx-auto justify-center mt-10 flex-col gap-5'>
                <input type="text" placeholder='Product ID' className='border px-5 py-3 border-gray-400 ' onChange={(e) => setProductId(e.target.value)} />
                <button className='border= bg-blue-600 p-3 text-center text-white uppercase hover:bg-blue-500' onClick={searchProductReviews} >Search</button>
            </div>

            {reviews && <div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="AllProductsTable mt-10 "
                    autoHeight
                />
            </div>}
        </div>
    )
}

export default Reviews