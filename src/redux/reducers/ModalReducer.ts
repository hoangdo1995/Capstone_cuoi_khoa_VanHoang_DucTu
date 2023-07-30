import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction,AnyAction } from "@reduxjs/toolkit";

interface ModalState{
    component:JSX.Element|null
}
const initialState:ModalState|null = {
    component:null
};

const ModalReducer = createSlice({
  name: 'ModalReducer',
  initialState,
  reducers: {
    setModalReducer:(state:ModalState,action:PayloadAction<JSX.Element>)=>{
        state.component = action.payload;
    }
  },
});

export const {setModalReducer} = ModalReducer.actions;

export default ModalReducer.reducer;
