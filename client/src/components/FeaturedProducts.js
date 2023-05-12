import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard/ProductCard';



const FeaturedProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products/featured-products').then(res => {
            setProducts(res.data.featuredProducts)
        }).catch(err => {
            toast.err(err.message)
        })
    }, [])


    return (
        <div className="bg-gray-50 mt-10">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products && products.map((product, index) => (
                        <div key={index} className="group relative">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
