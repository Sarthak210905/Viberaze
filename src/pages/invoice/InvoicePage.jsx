import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

const InvoicePage = () => {
    const { orderId } = useParams();
    const { items: orders, status } = useSelector(state => state.order);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (status === 'succeeded') {
            const foundOrder = orders.find(o => o.paymentId === orderId);
            setOrder(foundOrder);
        }
    }, [status, orders, orderId]);

    const handlePrint = () => {
        window.print();
    };

    if (status === 'loading' || !order) {
        return <Loader />;
    }

    const subtotal = order.cartItems.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);
    const tax = subtotal * 0.18; // Example 18% tax
    const total = subtotal + tax;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-lg shadow-md print-area">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Invoice</h1>
                        <button onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded no-print">Print Invoice</button>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <p><strong>Billed To:</strong></p>
                            <p>{order.addressInfo.name}</p>
                            <p>{order.addressInfo.address}</p>
                            <p>{order.addressInfo.pincode}</p>
                        </div>
                        <div>
                            <p><strong>Invoice Number:</strong> {order.paymentId}</p>
                            <p><strong>Date:</strong> {order.date}</p>
                        </div>
                    </div>
                    <table className="w-full mb-8">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {order.cartItems.map(item => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4">{item.title}</td>
                                    <td className="px-6 py-4">{item.quantity}</td>
                                    <td className="px-6 py-4">₹{(item.salePrice || item.price).toFixed(2)}</td>
                                    <td className="px-6 py-4">₹{((item.salePrice || item.price) * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <div className="w-1/3">
                            <div className="flex justify-between">
                                <p>Subtotal:</p>
                                <p>₹{subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Tax (18%):</p>
                                <p>₹{tax.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between font-bold text-xl mt-2">
                                <p>Total:</p>
                                <p>₹{total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media print {
                    .no-print {
                        display: none;
                    }
                    .print-area {
                        box-shadow: none;
                        border: 1px solid #ccc;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default InvoicePage; 