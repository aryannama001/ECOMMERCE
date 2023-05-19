import React, { useEffect, useState } from 'react'
import './createProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearNewProductError, clearNewProductSuccess, createProduct } from '../../features/productsSlice';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, success } = useSelector(state => state.newProduct)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearNewProductError())
        }

        if (success) {
            toast.success("Product Created Successfully")
            dispatch(clearNewProductSuccess())
            navigate('/admin/dashboard')
        }
    }, [dispatch, error, success])

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
        category: "",
        stock: 0,

    });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Clothing & Apparel",
        "Footwear & Shoes",
        "Electronics",
        "Games & Toys",
        "Stationery",
        "Mobile"
    ]

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", product.name);
        formData.set("price", product.price);
        formData.set("description", product.description);
        formData.set("category", product.category);
        formData.set("stock", product.stock);

        images.forEach(image => {
            formData.append("images", image)
        })

        dispatch(createProduct(formData));

    }

    return (
        <div className='min-h-screen bg-gray-200' >
            <div className="dashboard__container px-5">

                <div className="create__product__container">
                    <form encType="multipart/form-data" className='create__product__form rounded-md' onSubmit={handleSubmit} >
                        <h1 className='text-center text-xl text-blue-500 font-medium mb-4' >Create Product</h1>
                        <div>
                            <input type="text" placeholder='Name' required name='name' onChange={handleChange} />
                        </div>
                        <div>
                            <input type="number" placeholder='Price' required name='price' onChange={handleChange} />
                        </div>
                        <div>
                            <textarea placeholder='Description (please enter comma separated string)' onChange={handleChange} name='description' cols="30" rows="5"></textarea>
                        </div>
                        <div>
                            <select name='category' onChange={handleChange}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate.toLowerCase()}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input type="number" name='stock' required placeholder='Stock' onChange={handleChange} />
                        </div>
                        <div className='create__product__image__input' >
                            <input type="file" accept='image/*' multiple onChange={handleImageChange} />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <div className='create__product__btn'>
                            <button type='submit' disabled={loading ? true : false}>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct