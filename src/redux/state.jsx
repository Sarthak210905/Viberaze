import { configureStore } from "@reduxjs/toolkit";
import Deliverystatus from "./status";

export const store = configureStore({
    reducer: {
        status: Deliverystatus
    },
    
    devTools : true
})
