import { configureStore } from "@reduxjs/toolkit";
import PositionSearchReducer from "./reducers/PositionSearchReducer";
import ModalReducer from "./reducers/ModalReducer";
import DaySelectReducer from "./reducers/DaySelectReducer";
import userInforReducer from "./reducers/userInforReducer";

export const store = configureStore({
    reducer:{
        PositionSearchReducer:PositionSearchReducer,
        ModalReducer:ModalReducer,
        UserInforReducer:userInforReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
