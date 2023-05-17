import React from 'react'
import './createProduct.css'

const CreateProduct = () => {
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];
    return (
        <div className='min-h-screen bg-gray-200' >
            <div className="dashboard__container px-5">

                <div className="create__product__container">
                    <form encType="multipart/form-data" className='create__product__form rounded-md' >
                        <h1 className='text-center text-xl text-blue-500 font-medium mb-4' >Create Product</h1>
                        <div>
                            <input type="text" placeholder='Name' required />
                        </div>
                        <div>
                            <input type="number" placeholder='Price' required />
                        </div>
                        <div>
                            <textarea placeholder='Description (please enter comma separated string)' cols="30" rows="5"></textarea>
                        </div>
                        <div>
                            <select>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input type="number" required placeholder='Stock' />
                        </div>
                        <div className='create__product__image__input' >
                            <input type="file" accept='image/*' multiple />
                        </div>

                        <div className='create__product__btn'>
                            <button >
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