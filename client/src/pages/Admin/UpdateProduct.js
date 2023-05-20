import React, { useEffect, useState } from 'react'
import './createProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { clearError, clearUpdateError, clearUpdateStatus, getProductDetails, updateProduct } from '../../features/productSlice';

const UpdateProduct = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const productId = params.id
    const { error, product } = useSelector(state => state.product)

    const { loading, updateError, isUpdated } = useSelector(state => state.updateProduct)


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if (error) {
            toast.error(error);
            dispatch(clearError())
            navigate('/admin/products/all')
        }

        if (updateError) {
            toast.error(updateError)
            dispatch(clearUpdateError())
        }

        if (isUpdated) {
            toast.success("Product updated successfully")
            navigate('/admin/products/all')
            dispatch(clearUpdateStatus())
        }


    }, [dispatch, error, updateError, isUpdated, navigate, product, productId])




    const categories = [
        "Clothing",
        "Footwear",
        "Electronics",
        "Games",
        "Stationery",
        "Mobile"
    ]



    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([])

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

        formData.set("name", name);
        formData.set("price", price);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("stock", stock);

        images.forEach(image => {
            formData.append("images", image)
        })

        dispatch(updateProduct({ productId, formData }));

    }

    return (
        <div className='min-h-screen bg-gray-200' >
            <div className="dashboard__container px-5">

                <div className="create__product__container">
                    <form encType="multipart/form-data" className='create__product__form rounded-md' onSubmit={handleSubmit} >
                        <h1 className='text-center text-xl text-blue-500 font-medium mb-4' >Update Product</h1>
                        <div>
                            <input type="text" placeholder='Name' required name='name' onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        <div>
                            <input type="number" placeholder='Price' required name='price' onChange={(e) => setPrice(e.target.value)} value={price} />
                        </div>
                        <div>
                            <textarea placeholder='Description (please enter comma separated string)' value={description} onChange={(e) => setDescription(e.target.value)} name='description' cols="30" rows="5"></textarea>
                        </div>
                        <div>
                            <select name='category' onChange={(e) => setCategory(e.target.value)} value={category}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate.toLowerCase()}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input type="number" name='stock' required placeholder='Stock' onChange={(e) => setStock(e.target.value)} value={stock} />
                        </div>
                        <div className='create__product__image__input' >
                            <input type="file" accept='image/*' multiple onChange={handleImageChange} />
                        </div>
                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <div className='create__product__btn'>
                            <button type='submit' disabled={loading ? true : false}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct