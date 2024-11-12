import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        },
        deleteFromCart(state, action) {
            const index = state.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);  // Remove item directly
            }
        }
    }
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
