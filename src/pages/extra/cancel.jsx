import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Cancel = () => {
    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gray-900 px-8 py-12 text-center">
                            <h1 className="text-4xl font-bold text-white mb-4">
                                Cancellation & Refund Policy
                            </h1>
                            <p className="text-gray-300 text-lg">
                                Important information regarding order cancellations and refunds
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="px-8 py-12">
                            <div className="prose max-w-none">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                        Our Policy
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        At Viberaze, we are committed to delivering exceptional quality products. 
                                        Currently, we maintain a strict no-cancellation and no-refund policy to 
                                        ensure our production processes remain efficient and our pricing stays competitive.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        Why This Policy?
                                    </h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Each item is carefully crafted upon order confirmation
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            Our sustainable production model minimizes waste
                                        </li>
                                        <li className="flex items-start">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            We maintain competitive pricing through efficient operations
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        We're Here to Help
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        While we cannot process cancellations or refunds, your satisfaction remains 
                                        our priority. If you have any concerns about your order, product quality, 
                                        or sizing, please don't hesitate to reach out to our customer service team.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        We will work with you to address any issues and find the best possible solution 
                                        within our policy guidelines.
                                    </p>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                <strong>Before placing your order:</strong> Please carefully review product 
                                                descriptions, sizing charts, and images to ensure your selection meets your 
                                                expectations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-gray-50 px-8 py-8 text-center border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Have Questions or Concerns?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Our customer service team is ready to assist you with any inquiries.
                            </p>
                            <Link 
                                to="/contact"
                                className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-full 
                                hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                Contact Our Team
                            </Link>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            This policy is effective as of our launch date and may be updated periodically. 
                            Please check this page for the most current information.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cancel;