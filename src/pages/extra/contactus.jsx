import React from 'react';
import Navbar from '../../components/navbar/Navbar'; // Import Navbar component
// import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
const ContactUs = () => {
    return (
        <>
            <Navbar /> 
            <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 min-h-screen flex items-center justify-center py-12 px-6">
                <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10">
                    <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">Contact Us</h1>
                    <p className="text-gray-600 text-center mb-8">
                        Have any questions or concerns? Feel free to reach out to us, and we’ll get back to you as soon as possible!
                    </p>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Your Full Name"
                                className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message here..."
                                className="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-500 text-white font-medium rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
