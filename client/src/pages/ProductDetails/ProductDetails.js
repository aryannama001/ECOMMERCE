import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import ProductImgSlider from '../../components/ProductImgSlider/ProductImgSlider';
import { clearError, clearReviewStatus, getProductDetails, reviewSubmit } from '../../features/productSlice';
import './productDetails.css'
import ReactStars from 'react-stars'
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { toast } from 'react-toastify';
import { addToCart } from '../../features/cartSlice';
import Loader from '../../components/Loader';



const ProductDetails = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate()

    const { product, error, isReviewSubmited, loading } = useSelector((state) => state.product)

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")


    const handlerating = (newRating) => {
        setRating(newRating);
    }
    const decrementQuantity = () => {
        if (quantity <= 1) return;

        setQuantity(quantity - 1)
    }

    const incrementQuantity = () => {
        if (quantity >= product.stock) return;
        setQuantity(quantity + 1)
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
        if (isReviewSubmited) {
            toast.success("Review Submitted Successfully")
            dispatch(clearReviewStatus())
        }

        dispatch(getProductDetails(params.id))
    }, [dispatch, params, error, isReviewSubmited]);


    const handleReviewSubmit = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.set("rating", rating);
        data.set("comment", comment)
        const id = params.id
        dispatch(reviewSubmit({ id, data }))
        setRating(0)
        setComment("")
    }

    const addTocartHandler = () => {
        const id = params.id
        dispatch(addToCart({ id, quantity }))
        toast.success("product added to cart")
        navigate('/cart')
    }

    return (<>
        {loading ? <Loader /> : <div className='product__details__page'>
            <div className="product__details__container">
                <div className="product__images__slider">
                    <ProductImgSlider product={product} />

                </div>
                <div className='product__details'>
                    <h2>{product.name}</h2>
                    <div className="rating_wrap">

                        <ReactStars edit={false} value={product.ratings} half={true} size={25} /> {"  "}<span>{product.numOfReviews} reviews</span>
                    </div>
                    <div className="product__price__stock">
                        <span className='product__price__span'>₹{product.price}</span>
                        <div>
                            Status : {product.stock >= 1 ? <span className='instock'>InStock</span> : <span className='outofStock'>Out of Stock</span>}
                        </div>
                    </div>
                    <div className="product__cart__btns">
                        <div className="product__cart__input__feilds">
                            <button className='product__cart__btn' onClick={decrementQuantity}>-</button>
                            <input readOnly type="text" className='product__cart__input' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            <button className='product__cart__btn' onClick={incrementQuantity}>+</button>
                        </div>
                        <button className='product__addtocart__btn' onClick={addTocartHandler} ><span>Add to Cart</span> </button>
                    </div>
                    <div className="product__description">
                        <h4>About this Item : </h4>
                        <ul>
                            {
                                product.description && product.description.split(",").map((desc, i) => (
                                    <li key={i}>
                                        {desc}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </div>
            <div className="reviews__container">
                <span>Reviews</span>
                <div >
                    <form className="review__form__container" onSubmit={handleReviewSubmit}>
                        <ReactStars edit={true} value={rating} half={true} size={20} onChange={handlerating} />
                        <textarea name="" id="" value={comment} className=' border-2 rounded-md' onChange={(e) => setComment(e.target.value)} placeholder="write your review about the product" />
                        <button type='submit' >Submit review</button>
                    </form>
                </div>
                {product.reviews && product.reviews.map((review, i) => (
                    <div key={i} className='review__card__container'>
                        <ReviewCard review={review} />

                    </div>
                ))}

            </div>

        </div>}
    </>
    )
}

export default ProductDetails