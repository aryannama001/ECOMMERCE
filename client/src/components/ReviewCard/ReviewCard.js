import React from 'react'
import ReactStars from 'react-stars'
import './reviewCard.css'
const ReviewCard = ({ review }) => {
    return (
        <div className='review__card'>
            {review.name}
            <ReactStars edit={false} value={review.rating} half={true} size={20} />
            <p>
                {review.comment}
            </p>
        </div>
    )
}

export default ReviewCard