import React, { useContext } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import myContext from '../../../context/data/myContext';
import { FaBoxOpen, FaShoppingCart, FaUsers } from 'react-icons/fa';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';

function Dashboard() {
    const context = useContext(myContext);
    const { product, orders, user } = context;

    const totalProducts = product.length;
    const totalOrders = orders.length;
    const totalUsers = user.length;
    const totalSales = orders.reduce((acc, order) => {
        const orderTotal = order.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return acc + orderTotal;
    }, 0);

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* Total Sales */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">Total Sales</p>
                                <p className="text-3xl font-bold">₹{totalSales.toFixed(2)}</p>
                            </div>
                            <FaShoppingCart className="h-12 w-12 opacity-75" />
                        </div>

                        {/* Total Orders */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">Total Orders</p>
                                <p className="text-3xl font-bold">{totalOrders}</p>
                            </div>
                            <FaBoxOpen className="h-12 w-12 opacity-75" />
                        </div>

                        {/* Total Products */}
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">Total Products</p>
                                <p className="text-3xl font-bold">{totalProducts}</p>
                            </div>
                            <FaBoxOpen className="h-12 w-12 opacity-75" />
                        </div>

                        {/* Total Users */}
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">Total Users</p>
                                <p className="text-3xl font-bold">{totalUsers}</p>
                            </div>
                            <FaUsers className="h-12 w-12 opacity-75" />
                        </div>

                    </div>
                </div>
                <DashboardTab />
            </section>
        </Layout>
    );
}

export default Dashboard;