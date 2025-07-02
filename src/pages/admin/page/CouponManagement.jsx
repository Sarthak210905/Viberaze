import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, updateCoupon, deleteCoupon } from '../../../redux/couponSlice';
import { toast } from 'react-toastify';

const CouponManagement = () => {
    const dispatch = useDispatch();
    const { items: coupons, status } = useSelector(state => state.coupons);
    const [coupon, setCoupon] = useState({
        code: '',
        discount: '',
        type: 'percentage',
        startDate: '',
        endDate: '',
        usageLimit: '',
        restriction: 'none',
        minimumOrderValue: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCoupon({ ...coupon, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateCoupon(coupon));
            toast.success("Coupon updated successfully");
        } else {
            dispatch(addCoupon(coupon));
            toast.success("Coupon added successfully");
        }
        resetForm();
    };

    const handleEdit = (coupon) => {
        setCoupon(coupon);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteCoupon(id));
        toast.success("Coupon deleted successfully");
    };

    const resetForm = () => {
        setCoupon({
            code: '',
            discount: '',
            type: 'percentage',
            startDate: '',
            endDate: '',
            usageLimit: '',
            restriction: 'none',
            minimumOrderValue: ''
        });
        setIsEditing(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEditing ? 'Edit Coupon' : 'Add Coupon'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <input type="text" name="code" value={coupon.code} onChange={handleChange} placeholder="Coupon Code" className="w-full px-3 py-2 border rounded" required />
                <input type="number" name="discount" value={coupon.discount} onChange={handleChange} placeholder="Discount" className="w-full px-3 py-2 border rounded" required />
                <select name="type" value={coupon.type} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                    <option value="bogo">BOGO</option>
                    <option value="free-shipping">Free Shipping</option>
                </select>
                <input type="date" name="startDate" value={coupon.startDate} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                <input type="date" name="endDate" value={coupon.endDate} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                <input type="number" name="usageLimit" value={coupon.usageLimit} onChange={handleChange} placeholder="Usage Limit" className="w-full px-3 py-2 border rounded" />
                <input type="number" name="minimumOrderValue" value={coupon.minimumOrderValue} onChange={handleChange} placeholder="Minimum Order Value (₹)" className="w-full px-3 py-2 border rounded" />
                <select name="restriction" value={coupon.restriction} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                    <option value="none">None</option>
                    <option value="once-per-user">Once Per User</option>
                    <option value="first-time-user">First-Time User</option>
                </select>
                <div className="md:col-span-2 flex justify-end gap-4">
                    <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isEditing ? 'Update' : 'Add'}</button>
                </div>
            </form>

            <h3 className="text-xl font-bold mb-4 text-gray-800">Existing Coupons</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Limit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restriction</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {coupons.map(c => (
                            <tr key={c.id}>
                                <td className="px-6 py-4">{c.code}</td>
                                <td className="px-6 py-4">{c.type === 'bogo' || c.type === 'free-shipping' ? 'N/A' : `${c.discount}${c.type === 'percentage' ? '%' : '₹'}`}</td>
                                <td className="px-6 py-4">{c.type}</td>
                                <td className="px-6 py-4">{c.endDate}</td>
                                <td className="px-6 py-4">{c.usageLimit}</td>
                                <td className="px-6 py-4">{c.minimumOrderValue ? `₹${c.minimumOrderValue}` : 'No minimum'}</td>
                                <td className="px-6 py-4">{c.restriction}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleEdit(c)} className="text-blue-500 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(c.id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CouponManagement; 