import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 pt-8 pb-6 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/3 px-4 mb-4">
                        <h2 className="text-white text-lg font-medium mb-4">About Us</h2>
                        <p className="text-gray-500 leading-loose mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis ligula ut pharetra
                            aliquet. Nulla facilisi. In hac habitasse platea dictumst.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-white">
                                <FaFacebook />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-4 mb-4">
                        <h2 className="text-white text-lg font-medium mb-4">Quick Links</h2>
                        <ul className="list-none">
                            <li className="mb-2">
                                <Link to='/' className="text-gray-500 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to='/products' className="text-gray-500 hover:text-white">
                                    Shop
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to='/about' className="text-gray-500 hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to='/contact' className="text-gray-500 hover:text-white">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 px-4 mb-4">
                        <h2 className="text-white text-lg font-medium mb-4">Contact Us</h2>
                        <p className="text-gray-500 leading-loose mb-4">
                            123 Main St. Suite 100<br />
                            India, 12345<br />
                            info@example.com<br />
                            (123) 456-7890
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-6 flex justify-between items-center">
                    <p className="text-gray-500">&copy; 2023 My Ecommerce Site. All rights reserved.</p>
                    <ul className="list-none flex space-x-4">
                        <li>
                            <a href="#" className="text-gray-500 hover:text-white">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-500 hover:text-white">
                                Terms of Use
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
