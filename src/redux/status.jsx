import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('status')) ?? [];

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
        }
    }
});

export const { OrderStatus, UpdateOrderStatus } = Deliverystatus.actions;

export default Deliverystatus.reducer;
