import React,{useEffect, useState} from "react";
import PaginationComponent from "../Components/PaginationCoponent/PaginationComponent";
import AddAdminModalComonent from "../Components/AddAdminModalComonent/AddAdminModalComonent";
import { httpNonAuth } from "../../util/config";
import { LocationType, RoomDetailType } from "../../components/Modal/UtilModel";
import { number } from "yup";
import AddRoomModalComponent from "../Components/AddRoomModalComponent/AddRoomModalComponent";
import { setRoomInforReducer, setRoomInforState } from "../../redux/reducers/RoomInforReducer";
import { DispatchType } from "../../redux/store";
import { useDispatch } from "react-redux";

type Props = {};

const RoomManagerPage = (props: Props) => {
    const dispatch:DispatchType = useDispatch();
    const [rooms,setRooms] = useState<RoomDetailType[]>();
    const [page,setPage] = useState<number>(1);
    const [searchValue,setSearchValue] = useState<string>('');
    const [totalRow,setTotalRow] = useState<number>(0);
    const [locations,setLocations] = useState<LocationType[]>();
    const setRoomInfor = (userInfo:RoomDetailType)=>{
      const action = setRoomInforReducer(userInfo);
      dispatch(action);
    }
    const setRoomState = (state:string)=>{
      const action = setRoomInforState(state);
      dispatch(action);
    }
    const setPageNumberState=(pageNumber:number)=>{
      setPage(pageNumber);
    }

    const getLocationName = async()=>{
        try{
          const res = await httpNonAuth.get(`/api/vi-tri`);
          setLocations(res.data.content)
        }
        catch(err){

        }
    }
    const mapLocation = (id:number):string=>{
        if(locations){
          const location = locations.find(item=>item.id == id);
          if(location){
            return location.tinhThanh;
          }
        }
        return '';
    }
    const getRooms:()=>void = async()=>{
      if(searchValue===''){
        const usersList = await httpNonAuth.get(`/api/phong-thue/phan-trang-tim-kiem?pageIndex=${page}&pageSize=5`);
        setRooms(usersList?.data.content.data);
        setTotalRow(usersList?.data.content.totalRow);
      }
      else{
        const usersList = await httpNonAuth.get(`/api/users/search/${searchValue}`);
        setRooms(usersList?.data.content);
        setTotalRow(usersList?.data.content.totalRow);
      }
    }

    
    useEffect(()=>{
        getRooms();
        getLocationName();
    },[page])
  return <div className="adminPageManager">
      <div className="content">
        <h3 data-bs-toggle="modal" data-bs-target="#addRoomModal" onClick={()=>{
            setRoomState('add');
        }}>Thêm phòng</h3>
        <div className="searchBar">
          <input type="text" onChange={(event)=>{}}/>
          <button onClick={(event:any)=>{
            
          }}>Tìm</button>
        </div>
        <table className="table">
          <thead>
            <th>Mã phòng</th>
            <th>Tên phòng</th>
            <th>Hình ảnh</th>
            <th>Vị trí</th>
            <th>Số khách</th>
            <th>Option</th>
          </thead>
          <tbody className="tbody">
              {rooms?.map((room:RoomDetailType,index)=>{
                return <tr key={index}>
                <td>{room.id}</td>
                <td>{room.tenPhong}</td>
                <td>
                  <img src={room.hinhAnh} alt="..." />
                </td>
                <td>{mapLocation(room.maViTri)}</td>
                <td>{room.khach}</td>
                <td>
                  <button data-bs-toggle="modal" data-bs-target="#addRoomModal" onClick={()=>{
                    setRoomState('detail');
                    setRoomInfor(room);
                    
                  }}>Chi tiết</button>
                  <button data-bs-toggle="modal" data-bs-target="#addRoomModal" onClick={()=>{
                    setRoomState('edit');
                    setRoomInfor(room);
                  }}>Chỉnh sửa</button>
                  <button data-bs-toggle="modal" data-bs-target="#addRoomModal" onClick={()=>{
                    setRoomState('delete');
                    setRoomInfor(room);
                  }}>Xóa</button>
                </td>
              </tr>
              })}
          </tbody>
        </table>
      </div>
      <div className="pagination d-flex justify-content-center">
      {<PaginationComponent setPageNumberState={setPageNumberState} totalItem={totalRow}/>}
      </div>
      {<AddRoomModalComponent/>}
  </div>;
};

export default RoomManagerPage;
