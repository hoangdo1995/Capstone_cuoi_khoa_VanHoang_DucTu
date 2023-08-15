import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RoomDetailType, UserType } from "../../components/Modal/UtilModel";
import { boolean } from "yup";

interface stateType {
  value:RoomDetailType,
  state:string
}

const initialState:stateType = {
  value:{
    "id": 0,
    "tenPhong": "",
    "khach": 0,
    "phongNgu": 0,
    "giuong": 0,
    "phongTam": 0,
    "moTa": "",
    "giaTien": 0,
    "mayGiat": false,
    "banLa": false,
    "tivi": false,
    "dieuHoa": false,
    "wifi": false,
    "bep": false,
    "doXe": false,
    "hoBoi": false,
    "banUi": false,
    "maViTri": 0,
    "hinhAnh": ""
  },
  state:'add'
};


const RoomInforReducer = createSlice({
  name: 'PositionSearchReducer',
  initialState,
  reducers: {
        setRoomInforReducer:(state:stateType,action:PayloadAction<RoomDetailType>)=>{
            state.value = action.payload;
        },
        setRoomInforState:(state:stateType,action:PayloadAction<string>)=>{
          state.state = action.payload;
      }
  },
});

export const {setRoomInforReducer,setRoomInforState} = RoomInforReducer.actions;

export default RoomInforReducer.reducer;



