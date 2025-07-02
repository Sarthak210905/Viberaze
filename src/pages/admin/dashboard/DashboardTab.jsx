import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPieChart, AiOutlineMail } from 'react-icons/ai';
import { RiCoupon3Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../../redux/orderSlice';
import Analytics from './Analytics';
import CouponManagement from '../page/CouponManagement';
import CustomerManagement from '../page/CustomerManagement';
import EmailManagement from '../page/EmailManagement';

function DashboardTab() {
    const context = useContext(myContext);
    const { product, edithandle, deleteProduct, user } = context; 
    
    const { items: orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    
    const handleAddProduct = () => {
        window.location.href = '/addproduct';
    }

    const handleUpdateStatus = (orderId, status) => {
        dispatch(updateOrderStatus({ orderId, status }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Tabs>
                <TabList className="flex flex-wrap md:flex-nowrap gap-4 mb-8">
                    <Tab className="w-full md:w-auto">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <MdOutlineProductionQuantityLimits className="h-5 w-5" />
                            Products
                        </button>
                    </Tab>
                    <Tab className="w-full md:w-auto">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <AiFillShopping className="h-5 w-5" />
                            Orders
                        </button>
                    </Tab>
                    <Tab className="w-full md:w-auto">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <FaUser className="h-5 w-5" />
                            Users
                        </button>
                    </Tab>
                    <Tab className="w-full md:w-auto">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <RiCoupon3Fill className="h-5 w-5" />
                            Coupons
                        </button>
                    </Tab>
                    <Tab className="w-full md:w-auto">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <FaUser className="h-5 w-5" />
                            Customers
                        </button>
                    </Tab>
                    <Tab className="w-full md:w-auto">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <AiOutlineMail className="h-5 w-5" />
                            Email
                        </button>
                    </Tab>
                    <Tab className="w-full md:w-auto">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <AiFillPieChart className="h-5 w-5" />
                            Analytics
                        </button>
                    </Tab>
                </TabList>

                <TabPanel>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Product Details</h2>
                            <button 
                                onClick={handleAddProduct}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <FaCartPlus className="h-4 w-4" />
                                Add Product
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {product.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img 
                                                    src={item.imageUrls && item.imageUrls[0]} 
                                                    alt={item.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">₹{item.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.stock > 0 ? (
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.stock < 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                        {item.stock} in stock
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        Out of stock
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => deleteProduct(item)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link to="/updateproduct">
                                                        <button 
                                                            onClick={() => edithandle(item)}
                                                            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                                                        >
                                                            Edit
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-6">Order Details</h2>
                        {orders && orders.length > 0 ? (
                            orders.map((order, index) => (
                                <div key={index} className="mb-8 overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Info</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {order.cartItems.map((item, itemIndex) => (
                                                <tr key={itemIndex}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{order.paymentId}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <img 
                                                            src={item.imageUrl || item.imageUrls[0]} 
                                                            alt={item.title}
                                                            className="w-16 h-16 object-cover rounded"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">₹{item.price}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="space-y-1">
                                                            <p className="text-sm text-gray-900 font-medium">{order.addressInfo.name}</p>
                                                            <p className="text-sm text-gray-500">{order.addressInfo.address}</p>
                                                            <p className="text-sm text-gray-500">{order.addressInfo.pincode}</p>
                                                            <p className="text-sm text-gray-500">{order.addressInfo.phoneNumber}</p>
                                                            <p className="text-sm text-gray-500">{order.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <select 
                                                            value={order.status} 
                                                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        >
                                                            <option value="processing">Processing</option>
                                                            <option value="shipped">Shipped</option>
                                                            <option value="delivered">Delivered</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No orders available.</p>
                        )}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-6">User Details</h2>
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UID</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {user.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.uid}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>

                <TabPanel>
                    <CouponManagement />
                </TabPanel>

                <TabPanel>
                    <CustomerManagement />
                </TabPanel>

                <TabPanel>
                    <EmailManagement />
                </TabPanel>

                <TabPanel>
                    <Analytics />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default DashboardTab;