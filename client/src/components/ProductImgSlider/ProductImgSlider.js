import React from 'react'
import './productImgSlider.css'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ProductImgSlider = ({ product }) => {

    const items = product.images && product.images.map(image => (
        {
            original: image.url,
            thumbnail: image.url,
        }
    ))

    return (
        <div>
            {product.images && <ImageGallery items={items} autoPlay={true} showPlayButton={false} />}
        </div>
    )
}

export default ProductImgSlider