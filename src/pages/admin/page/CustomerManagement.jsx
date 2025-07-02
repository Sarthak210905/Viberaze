import React, { useContext, useState, useEffect } from 'react';
import myContext from '../../../context/data/myContext';
import { Link } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { fireDB } from '../../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';

const CustomerManagement = () => {
    const { user: customers = [], order = [], getAllUserFunction } = useContext(myContext);
    // console.log("All customers from context:", customers);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [modalOrder, setModalOrder] = useState(null);

    useEffect(() => {
        if (getAllUserFunction) getAllUserFunction();
    }, [getAllUserFunction]);

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name?.toLowerCase().includes(search.toLowerCase()) ||
            customer.email?.toLowerCase().includes(search.toLowerCase())
    );

    const getCustomerOrders = (customerId, customerUid) => {
        if (!order || !Array.isArray(order)) return [];
        const matchedOrders = order.filter(o => o.userid === customerId || o.userid === customerUid);
        console.log('Checking orders for customer:', customerId, customerUid, matchedOrders);
        return matchedOrders;
    };

    const handleEditClick = (customer) => {
        setEditingCustomer(customer);
        setFormData({ name: customer.name, email: customer.email });
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!editingCustomer) return;
        const userRef = doc(fireDB, 'users', editingCustomer.id);
        try {
            await updateDoc(userRef, {
                name: formData.name,
                email: formData.email
            });
            toast.success("Customer updated successfully");
            setEditingCustomer(null);
            getAllUserFunction(); // Refresh user list
        } catch (error) {
            toast.error("Failed to update customer");
        }
    };

    const handleSendOrderEmail = async (order, customerEmail) => {
        try {
            await fetch('https://<your-region>-<your-project-id>.cloudfunctions.net/sendOrderEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerEmail,
                    adminEmail: 'admin@example.com', // TODO: Replace with your admin email
                    orderInfo: order,
                }),
            });
            toast.success('Order email sent!');
        } catch (error) {
            toast.error('Failed to send order email');
        }
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === filteredCustomers.length) setSelectedUsers([]);
        else setSelectedUsers(filteredCustomers.map(u => u.id));
    };

    const handleBulkEmail = async () => {
        const emails = filteredCustomers.filter(u => selectedUsers.includes(u.id)).map(u => u.email);
        if (emails.length === 0) return toast.error('No users selected');
        try {
            await fetch('https://<your-region>-<your-project-id>.cloudfunctions.net/sendOrderEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerEmail: emails.join(','),
                    adminEmail: 'admin@example.com',
                    orderInfo: { bulk: true },
                }),
            });
            toast.success('Bulk email sent!');
        } catch (error) {
            toast.error('Failed to send bulk email');
        }
    };

    const handleShowOrderModal = (order) => {
        setModalOrder(order);
        setShowOrderModal(true);
    };

    const handleCloseOrderModal = () => {
        setShowOrderModal(false);
        setModalOrder(null);
    };

    const csvData = filteredCustomers.map(u => ({
        Name: u.name,
        Email: u.email,
        Phone: u.phone,
        Registered: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-',
        Orders: getCustomerOrders(u.id, u.uid).length
    }));

    if (!customers || !order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Management</h2>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-4 px-3 py-2 border rounded w-full max-w-xs"
            />
            <div className="flex gap-4 mb-4">
                <button onClick={handleBulkEmail} className="bg-blue-500 text-white px-4 py-2 rounded">Send Bulk Email</button>
                <CSVLink data={csvData} filename="users.csv" className="bg-green-500 text-white px-4 py-2 rounded">Export CSV</CSVLink>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th><input type="checkbox" checked={selectedUsers.length === filteredCustomers.length && filteredCustomers.length > 0} onChange={handleSelectAll} /></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Registered</th>
                            <th>Orders</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCustomers.map(customer => (
                            <React.Fragment key={customer.id}>
                                <tr>
                                    <td><input type="checkbox" checked={selectedUsers.includes(customer.id)} onChange={() => handleSelectUser(customer.id)} /></td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone || '-'}</td>
                                    <td>{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '-'}</td>
                                    <td>{getCustomerOrders(customer.id, customer.uid).length}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(customer)} className="text-blue-500 mr-4">Edit</button>
                                        <button onClick={() => setSelectedCustomer(selectedCustomer === customer.id ? null : customer.id)} className="text-blue-500">
                                            {selectedCustomer === customer.id ? 'Hide Orders' : 'View Orders'}
                                        </button>
                                    </td>
                                </tr>
                                {selectedCustomer === customer.id && (
                                    <tr>
                                        <td colSpan="7">
                                            <h4 className="font-bold mb-2">Order History</h4>
                                            {getCustomerOrders(customer.id, customer.uid).map(order => (
                                                <div key={order.paymentId} className="border-b p-2">
                                                    <p><strong>Order ID:</strong> {order.paymentId}</p>
                                                    <p><strong>Date:</strong> {order.date}</p>
                                                    <p><strong>Total:</strong> ₹{order.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                                                    <button className="ml-4 text-green-600 underline" onClick={() => handleShowOrderModal(order)}>Order Details</button>
                                                    <button className="ml-4 text-green-600 underline" onClick={() => handleSendOrderEmail(order, customer.email)}>Send Email</button>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Edit Customer</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="w-full px-3 py-2 border rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="w-full px-3 py-2 border rounded" />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setEditingCustomer(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showOrderModal && modalOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">Order Details</h3>
                        <pre className="mb-4 text-sm bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(modalOrder, null, 2)}</pre>
                        <button onClick={handleCloseOrderModal} className="bg-gray-300 px-4 py-2 rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerManagement; 