import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
const Cancel = () => {
    return (
        <>
            <Navbar />
        <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 min-h-screen flex items-center justify-center py-12">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="p-8 sm:p-12">
                    <h1 className="text-center text-5xl font-extrabold text-blue-600 mb-6">
                        Cancellation & Refund Policy
                    </h1>
                    <p className="text-lg text-gray-600 text-center leading-relaxed">
                        We regret to inform you that we currently do not entertain cancellations or refunds. 
                        However, your satisfaction is important to us. Please feel free to reach out if you 
                        have any concerns, and we will assist you to the best of our ability.
                    </p>
                </div>
                <div className="bg-blue-50 p-6 flex justify-center">
                    <button
                        className="px-8 py-3 bg-blue-500 text-white font-medium rounded-full shadow-md 
                        hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out"
                    >
                        <Link to={'/contact'} className="text-white">
                            Contact Us
                        </Link>
                    </button>
                </div>
            </div>
        </div>
            <Footer />
                        </>
    );
};

export default Cancel;
