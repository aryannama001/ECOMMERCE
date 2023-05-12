import React from 'react';
import { FaShippingFast, FaHandHoldingUsd, FaStar } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">About Us</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        At our ecommerce store, we're committed to providing our customers with the best possible online shopping experience. Here are a few reasons why you should choose us:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white shadow rounded-lg p-6">
                            <FaShippingFast className="text-4xl text-blue-500 mb-4 mx-auto" />
                            <h2 className="text-xl font-medium text-gray-800 mb-2">Fast Shipping</h2>
                            <p className="text-gray-600">We offer fast shipping on all orders, so you can get your items as quickly as possible.</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <FaHandHoldingUsd className="text-4xl text-blue-500 mb-4 mx-auto" />
                            <h2 className="text-xl font-medium text-gray-800 mb-2">Affordable Prices</h2>
                            <p className="text-gray-600">We offer competitive prices on all our products, so you can get great deals and save money.</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <FaStar className="text-4xl text-blue-500 mb-4 mx-auto" />
                            <h2 className="text-xl font-medium text-gray-800 mb-2">High Quality Products</h2>
                            <p className="text-gray-600">We only sell high quality products that are guaranteed to meet your expectations.</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                        <p className="text-gray-600 mb-4">
                            Our ecommerce store was founded in 2023 with the goal of providing customers with an easy and convenient way to shop online. We started small, but over the years we've grown into a thriving business with a large and loyal customer base.
                        </p>
                        <p className="text-gray-600 mb-4">
                            At our store, we believe in offering the best possible customer service. That's why we have a team of dedicated customer support specialists who are available 24/7 to answer any questions or concerns you may have.
                        </p>
                        <p className="text-gray-600 mb-4">
                            We're always striving to improve our store and make it a better shopping experience for our customers. If you have any suggestions or feedback, please don't hesitate to contact us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
