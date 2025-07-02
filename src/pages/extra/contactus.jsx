import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have questions about our products, need assistance with your order, or want to learn more about Viberaze? We're here to help.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="order-inquiry">Order Inquiry</option>
                                        <option value="product-question">Product Question</option>
                                        <option value="size-guide">Size Guide Help</option>
                                        <option value="partnership">Partnership/Collaboration</option>
                                        <option value="press-media">Press & Media</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        placeholder="Tell us how we can help you..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors resize-vertical"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-4 mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Email</h3>
                                            <p className="text-gray-600">viberaze.vr@gmail.com</p>
                                            <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-4 mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Phone</h3>
                                            <p className="text-gray-600">+91 8349007721</p>
                                            <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM IST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mr-4 mt-1">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Social Media</h3>
                                            <div className="flex space-x-4 mt-2">
                                                <a 
                                                    href="https://www.instagram.com/viberaze.in" 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                                >
                                                    Instagram
                                                </a>
                                                <a 
                                                    href="https://www.twitter.com/viberaze.in" 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                                >
                                                    Twitter
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-900 text-white rounded-lg p-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-1">Order Status</h4>
                                        <p className="text-sm text-gray-300">
                                            Check your email for tracking information sent after order confirmation.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1">Size Guide</h4>
                                        <p className="text-sm text-gray-300">
                                            Detailed sizing charts are available on each product page.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1">Shipping</h4>
                                        <p className="text-sm text-gray-300">
                                            Standard shipping takes 5-7 business days within the US.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Response Time Notice */}
                    <div className="mt-12 text-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Our Commitment to You
                            </h3>
                            <p className="text-gray-600">
                                We value every customer inquiry and strive to respond to all messages within 24 hours during business days. 
                                For urgent matters, please don't hesitate to reach out via phone or social media.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;