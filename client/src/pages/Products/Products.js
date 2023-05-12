import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import ProductCard from '../../components/ProductCard/ProductCard'
import { getAllProducts } from '../../features/productsSlice';
import './products.css'
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import { Chip, TextField, Typography } from '@mui/material';


const Products = () => {
    const dispatch = useDispatch();

    const [category, setCategory] = useState("")
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [price, setPrice] = useState([0, 50000])
    const [rating, setRating] = useState(0)

    const { products, error, productsCount } = useSelector((state) => state.products)

    useEffect(() => {
        if (error) {
            toast.error(error)

        }

        dispatch(getAllProducts({ category, page, limit, price, rating }))
    }, [dispatch, error, category, page, limit, price, rating]);

    useEffect(() => {
        setPage(1)

    }, [category])
    const categories = [
        "Clothing & Apparel",
        "Footwear & Shoes",
        "Electronics",
        "Games & Toys",
        "Stationery",
        "Mobile"

    ]

    const handlePageClick = (e) => {

        setPage(e)
    }

    const handlePriceChange = (e, newPrice) => {
        setPrice(newPrice)
    }
    const handleRatingFilter = (e, newRating) => {
        setRating(newRating)
    }

    return (
        <>
            <div className="products__page">
                <div className="filter__container">
                    <div className="filter_heading">
                        <Typography>Filters</Typography>
                        <div className="chips__container">
                            {category && <Chip size="small" color="primary" variant="outlined" label={category} onDelete={() => setCategory("")} />}
                            {rating !== 0 && <Chip size="small" color="primary" variant="outlined" label={`${rating}★ & above`} onDelete={() => setRating(0)} />}
                            {(price[0] !== 0 || price[1] !== 50000) && <Chip size="small" color="primary" variant="outlined" label={`${price[0]} - ${price[1]} ₹`} onDelete={() => setPrice([0, 50000])} />}
                        </div>
                    </div>
                    <div className="categories_container">

                        <ul className='categories'>
                            <Typography >
                                categories
                            </Typography>
                            {
                                categories.map((item, i) => (
                                    <li key={i} onClick={() => setCategory(item.toLowerCase())}>
                                        {item}

                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="price__range">
                        <Typography >
                            Price
                        </Typography>
                        <Slider
                            value={price}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={50000}
                        />
                        <div className="price_input">
                            <TextField label="Min" value={price[0]} size='small' onChange={(e) => setPrice([e.target.value, price[1]])} />
                            <TextField label="Max" value={price[1]} size='small' onChange={(e) => setPrice([price[0], e.target.value])} />
                        </div>
                    </div>
                    <div className="rating__filter__container">
                        <Typography>Rating Above</Typography>
                        <Slider
                            aria-label="Temperature"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={5}
                            value={rating}
                            onChange={handleRatingFilter}
                        />
                    </div>
                </div>

                <div className="products__container">

                    <div className="products__heading">
                        <span>Procucts</span>
                    </div>



                    <div className="products__list__container">
                        {
                            products && products.map((item, i) => (
                                <ProductCard product={item} />
                            ))
                        }
                    </div>
                    {
                        productsCount > limit &&

                        <div className="pagination__box">
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={limit}
                                totalItemsCount={productsCount}
                                onChange={handlePageClick}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    }
                    {
                        !productsCount && <h2 style={{
                            textAlign: "center"
                        }}>No Products found</h2>
                    }
                </div>


            </div>
        </>
    )
}

export default Products