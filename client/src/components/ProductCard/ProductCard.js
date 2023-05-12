import React from 'react'
import ReactStars from 'react-stars'
import './productCard.css'
import { Link } from 'react-router-dom'
const ProductCard = ({ product }) => {

    const starOptions = {
        edit: false,
        value: product.ratings,
        half: true,
    }
    return (
        <div className="product__card">

            <Link to={`/product/${product._id}`} className='product__card' >
                <div className="product__image">
                    <img src={product.images[0] ? product.images[0].url : "/images/online-shopping.svg"} alt="" />
                </div>
                <div className="product__details__card">
                    <h2 className='product_name'>{product.name}</h2>
                    <div className='product__card__rating__div'>
                        <ReactStars  {...starOptions} size={19} className='product_card_rating' /> {"  "} <span>({product.numOfReviews})</span>
                    </div>
                    <span>₹{product.price}</span>{"  "}

                </div>
            </Link>
        </div>

    )
}

export default ProductCard