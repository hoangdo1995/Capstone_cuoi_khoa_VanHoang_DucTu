import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../components/Modal/UtilModel";
import { boolean } from "yup";

interface stateType {
  value:UserType,
  state:string
}

const initialState:stateType = {
  value:{
    id: 0,
    name:      "",
    email:     "",
    password:  "",
    phone:     "",
    birthday:  "",
    avatar:    "",
    gender:    true,
    role:      '',
  },
  state:'add'
};


const UserInforReducer = createSlice({
  name: 'PositionSearchReducer',
  initialState,
  reducers: {
        setUserInforReducer:(state:stateType,action:PayloadAction<UserType>)=>{
            state.value = action.payload;
        },
        setUserInforState:(state:stateType,action:PayloadAction<string>)=>{
          state.state = action.payload;
      }
  },
});

export const {setUserInforReducer,setUserInforState} = UserInforReducer.actions;

export default UserInforReducer.reducer;



