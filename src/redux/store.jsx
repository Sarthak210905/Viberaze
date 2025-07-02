import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from './wishlistSlice';
import profileReducer from './profileSlice';
import orderReducer from './orderSlice';
import couponReducer from './couponSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        profile: profileReducer,
        order: orderReducer,
        coupons: couponReducer,
    },
    devTools: true
})