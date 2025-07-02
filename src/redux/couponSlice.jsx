import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { fireDB } from '../firebase/FirebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export const fetchCoupons = createAsyncThunk('coupons/fetchCoupons', async () => {
    const couponsCol = collection(fireDB, 'coupons');
    const couponSnapshot = await getDocs(couponsCol);
    const couponList = couponSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            ...(data.time && typeof data.time.toMillis === 'function' ? { time: data.time.toMillis() } : {})
        };
    });
    return couponList;
});

export const addCoupon = createAsyncThunk('coupons/addCoupon', async (couponData) => {
    const couponsCol = collection(fireDB, 'coupons');
    const docRef = await addDoc(couponsCol, couponData);
    return { id: docRef.id, ...couponData };
});

export const updateCoupon = createAsyncThunk('coupons/updateCoupon', async ({ id, ...couponData }) => {
    const couponRef = doc(fireDB, 'coupons', id);
    await updateDoc(couponRef, couponData);
    return { id, ...couponData };
});

export const deleteCoupon = createAsyncThunk('coupons/deleteCoupon', async (id) => {
    const couponRef = doc(fireDB, 'coupons', id);
    await deleteDoc(couponRef);
    return id;
});

const couponSlice = createSlice({
    name: 'coupons',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addCoupon.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                const index = state.items.findIndex(coupon => coupon.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.items = state.items.filter(coupon => coupon.id !== action.payload);
            });
    },
});

export default couponSlice.reducer; 