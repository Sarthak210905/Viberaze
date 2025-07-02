import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fireDB } from '../firebase/FirebaseConfig';
import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';

// Async Thunks
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
    try {
        const ordersCol = collection(fireDB, 'orders');
        const orderSnapshot = await getDocs(ordersCol);
        const orderList = orderSnapshot.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                ...d,
                date: d.date && d.date.toMillis ? d.date.toMillis() : d.date,
                cartItems: Array.isArray(d.cartItems) ? d.cartItems.map(item => ({
                    ...item,
                    time: item.time && item.time.toMillis ? item.time.toMillis() : item.time
                })) : d.cartItems
            };
        });
        return orderList;
    } catch (error) {
        toast.error('Could not fetch orders.');
        return rejectWithValue(error.message);
    }
});

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const orderRef = doc(fireDB, 'orders', orderId);
            await updateDoc(orderRef, { status: status });
            toast.success('Order status updated successfully');
            return { orderId, status };
        } catch (error) {
            toast.error('Failed to update order status.');
            return rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { orderId, status } = action.payload;
                const existingOrder = state.items.find((order) => order.id === orderId);
                if (existingOrder) {
                    existingOrder.status = status;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer; 