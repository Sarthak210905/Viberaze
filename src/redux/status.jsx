import { createSlice } from "@reduxjs/toolkit";

const initialState = (() => {
    try {
        return JSON.parse(localStorage.getItem('status')) ?? [];
    } catch {
        return [];
    }
})();

const Deliverystatus = createSlice({
    name: 'status',
    initialState,
    reducers: {
        OrderStatus(state, action) {
            state.push(action.payload);
            localStorage.setItem('status', JSON.stringify(state));
        },
        UpdateOrderStatus(state, action) {
            const index = state.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
                localStorage.setItem('status', JSON.stringify(state));
            }
        },
        UpdateShippingStatus(state, action) {
            const index = state.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state[index].shippingStatus = action.payload.shippingStatus;
                localStorage.setItem('status', JSON.stringify(state));
            }
        },
        LoadOrderHistory(state) {
            return JSON.parse(localStorage.getItem('status')) ?? [];
        },
        PlaceOrder(state, action) {
            state.push(action.payload);
            localStorage.setItem('status', JSON.stringify(state));
        }
    }
});

export const { OrderStatus, UpdateOrderStatus, LoadOrderHistory, PlaceOrder, UpdateShippingStatus } = Deliverystatus.actions;

export default Deliverystatus.reducer;
