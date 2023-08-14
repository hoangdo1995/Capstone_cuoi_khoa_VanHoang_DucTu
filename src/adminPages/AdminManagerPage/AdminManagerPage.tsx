import React,{useEffect,useState} from "react";
import PaginationComponent from "../Components/PaginationCoponent/PaginationComponent";
import AddAdminModalComonent from "../Components/AddAdminModalComonent/AddAdminModalComonent";
import { http, httpNonAuth } from "../../util/config";
import { UserType } from "../../components/Modal/UtilModel";
import { userInfo } from "os";
import { setUserInforReducer } from "../../redux/reducers/userInforReducer";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";

type Props = {};

const AdminManagerPage = (props: Props) => {
  const dispatch:DispatchType = useDispatch();
  const [users,setUsers] = useState<UserType[]>();
  const [page,setPage] = useState<number>(1);
  const [totalRow,setTotalRow] = useState<number>(0);
  const [searchValue,setSearchValue] = useState<string>('');
  const setUserInfor = (userInfo:UserType)=>{
    const action = setUserInforReducer(userInfo);
    dispatch(action);
  }
  const setPageNumberState=(pageNumber:number)=>{
      setPage(pageNumber);
  }
  const getUsers:()=>void = async()=>{
      if(searchValue===''){
        const usersList = await httpNonAuth.get(`/api/users/phan-trang-tim-kiem?pageIndex=${page}&pageSize=6`);
        setUsers(usersList?.data.content.data);
        setTotalRow(usersList?.data.content.totalRow);
      }
      else{
        const usersList = await httpNonAuth.get(`/api/users/search/${searchValue}`);
        setUsers(usersList?.data.content);
        setTotalRow(usersList?.data.content.totalRow);
      }
  }
  useEffect(()=>{
    getUsers();
  },[page])

  return <div className="adminPageManager">
      <div className="content">
        <h3 data-bs-toggle="modal" data-bs-target="#paginationBar" onClick={()=>{
          setUserInfor({
            id: 1,
            "name": "",
            "email": "",
            "password": "",
            "phone": "",
            "birthday": "",
            "avatar": "",
            "gender":true ,
            "role": ""
          })
        }}>Thêm quản trị viên</h3>
        <div className="searchBar">
          <input type="text" onChange={(event)=>setSearchValue(event.target.value)}/>
          <button onClick={(event:any)=>{
            console.log(event.target.value);
            getUsers();
          }}>Tìm</button>
        </div>
        <table className="table">
          <thead>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Avatar</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Option</th>
          </thead>
          <tbody className="tbody">
            {users?.map((user,index)=>{
             return <tr key={index}>
              <td className="overflow-ellipsis">{user?.id}</td>
              <td className="overflow-ellipsis">{user.name}</td>
              <td className="overflow-ellipsis">{user.email}</td>
              <td className="overflow-ellipsis">{user.birthday}</td>
              <td className="avatarTd">
                <img src={user.avatar} alt="..." />
              </td>
              <td className="overflow-ellipsis">{user?.gender?"Nam":"Nữ"}</td>
              <td className="overflow-ellipsis">{user.role}</td>
              <td>
                  <button onClick={()=>{
                    setUserInfor(user);
                  }} data-bs-toggle="modal" data-bs-target="#paginationBar">Chi tiết</button>
                  <button>Chỉnh sửa</button>
                  <button>Xóa</button>
              </td>
            </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination d-flex justify-content-center">
      {<PaginationComponent setPageNumberState={setPageNumberState} totalItem={totalRow}/>}
      </div>
      {<AddAdminModalComonent/>}
  </div>;
};

export default AdminManagerPage;
