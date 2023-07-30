import { configureStore } from "@reduxjs/toolkit";
import PositionSearchReducer from "./reducers/PositionSearchReducer";
import ModalReducer from "./reducers/ModalReducer";

export const store = configureStore({
    reducer:{
        PositionSearchReducer:PositionSearchReducer,
        ModalReducer:ModalReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
