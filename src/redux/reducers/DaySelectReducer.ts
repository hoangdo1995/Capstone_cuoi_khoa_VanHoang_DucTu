import { Action, createSlice } from "@reduxjs/toolkit";
import { PayloadAction,AnyAction } from "@reduxjs/toolkit";
import { DaySelectType } from "../../components/Modal/UtilModel";


interface DaySelectState{
  value:DaySelectType|null,
}
const initialState:DaySelectState = {
    value:null
};
const DaySelectReducer = createSlice({
  name: 'ModalReducer',
  initialState,
  reducers: {
    setDaySelect:(state:DaySelectState,action:PayloadAction<DaySelectType>)=>{
        state.value = action.payload
    }
  },
});

export const {setDaySelect} = DaySelectReducer.actions;

export default DaySelectReducer.reducer;