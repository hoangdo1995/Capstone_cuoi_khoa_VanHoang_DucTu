import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction,AnyAction } from "@reduxjs/toolkit";
import { boolean } from "yup";

interface ModalState{
    component:JSX.Element|null,
    state:boolean
}
const initialState:ModalState|null = {
    component:null,
    state:true
};

const ModalReducer = createSlice({
  name: 'ModalReducer',
  initialState,
  reducers: {
    setModalReducer:(state:ModalState,action:PayloadAction<JSX.Element>)=>{
        state.component = action.payload;
    },
    setModalStateReducer:(state:ModalState,action:PayloadAction<boolean>)=>{
        state.state = action.payload;
    }
  },
});

export const {setModalReducer,setModalStateReducer} = ModalReducer.actions;

export default ModalReducer.reducer;
