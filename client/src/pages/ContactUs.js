import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users/contact', formData)
            .then((res) => {
                console.log(res.data)
                setFormData({ name: '', email: '', message: '' });
                toast.success("Message Sent")
            })
            .catch((err) => {
                toast.error(err)
            });
    };
    return (
        <div className="bg-gray-100 py-10 h-screen" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                            <input type="text" id="name" name="name" className="w-full  rounded-md shadow-sm py-2 px-3  focus:ring-blue-500 focus:border-blue-500 sm:text-lg" onChange={handleChange} value={formData.name} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" id="email" name="email" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-lg" onChange={handleChange} value={formData.email} />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Message</label>
                            <textarea id="message" name="message" rows="4" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-lg" onChange={handleChange} value={formData.message} />
                        </div>
                        <div>
                            <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
