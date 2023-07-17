import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";

export const store = configureStore({
    reducer:{
        number:(state=1)=>state
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
