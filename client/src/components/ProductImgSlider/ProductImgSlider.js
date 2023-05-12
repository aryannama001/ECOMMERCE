import React from 'react'
import './productImgSlider.css'
import Slider from "react-slick";
const ProductImgSlider = ({ product }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    return (
        <div>
            <Slider {...settings} className='product__image__slider'>
                {
                    product.images && product.images.map((item, i) => (
                        <div>
                            <img src={item.url} alt="" className='product__slider__image' />
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default ProductImgSlider