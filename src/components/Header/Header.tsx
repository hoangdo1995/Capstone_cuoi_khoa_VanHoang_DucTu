import React, { useEffect, useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import PositionSelect from "../PositionSelect/PositionSelect";
import { PositionType } from "../../redux/reducers/PositionSearchReducer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { setModalReducer } from "../../redux/reducers/ModalReducer";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { history } from "../..";
import { USER_LOGIN, getStoreJson, setStoreJson } from "../../util/config";

export interface UserLoginType {
  token:string,
  email:string
}
type Props = {
  modalStateHandle:(state:boolean)=>void
};

const Header = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  let [iconTheme, setIconTheme] = useState(<i className="fa fa-sun"></i>);
  const { value } = useSelector((state: RootState) => state.PositionSearchReducer);
  const { userLogin } = useSelector((state: RootState) => state.UserReducer);
  
  const [userToken,setUserToken] = useState<UserLoginType>(getStoreJson(USER_LOGIN));
  const setUserTokenState = (value:UserLoginType)=>{
      setUserToken(value);
  }
  useEffect(() => {

  }, [userToken,userLogin])
  
  
  return <div className="d-flex justify-content-between align-items-baseline py-3 container">
            <NavLink to={''} className="fs-2 fw-bolder d-flex align-items-center logo">
              <i className="fab fa-airbnb me-2 fw-bolder fs-1"></i>AirBnB
            </NavLink>
            <div className="navBar d-flex flex-column align-items-center">
              <button className="rounded-pill d-flex bg-light align-items-center justify-content-center searchNav ps-2 pe-1" onClick={()=>{
                  document.querySelector('.selectNav')?.classList.toggle('d-none');
              }}>
                  <span className="border-end border-1 border-secondary">{(value?.name!=='')?value?.name:'Nơi đến'}</span>
                  <span className="border-end border-2 border-secondary-subtle">Trải nghiệm</span>
                  <span className="" >Trải nghiệm trực tuyến </span>
                  <button className="border-0 bg-transparent"><i className="fa fa-search ms-2"></i></button>
              </button>
              <div className="selectNav rounded-pill border border-1 mt-2 d-none d-flex justify-content-between">
                  <PositionSelect/>
                  <button className="dateBtn border-star">Thời gian đến</button>
                  <button className="dateBtn">Thời gian đi</button>
                  <button className="border-0 bg-transparent searchBtn" onClick={()=>{
                    document.querySelector('.selectNav')?.classList.toggle('d-none');
                    history.push('/list-room');
              }}><i className="fa fa-search ms-2"></i></button>
              </div>
            </div>
            <div className="settingButton d-flex align-items-center">
                <NavLink to={''}>Đón tiếp khách</NavLink>
                <button className="border-0 bg-transparent btn-theme" onClick={()=>{
                  document.querySelector('body')?.classList.toggle('dark-theme');
                  document.querySelector('body')?.classList.contains('dark-theme')?setIconTheme(<i className="fa fa-sun text-white"></i>):setIconTheme(<i className="fa fa-moon"></i>)
                }}>{iconTheme}</button>
                <button className="border rounded-pill px-2 py-1 border-secondary loginButton d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa fa-align-justify me-2" />
                  <i className="fa fa-user-circle" />
                </button>
                <ul className="dropdown-menu">
                  {userLogin?.token&&<li><Link className="dropdown-item" to={'profile'}>{userLogin.user.name}</Link></li>}
                  {!userLogin?.token&&<li><Link className="dropdown-item" to={'login'}>Log in</Link></li>}
                  {userLogin?.token&&<li><Link className="dropdown-item text-danger" to={"#"}onClick={()=>{
                    if(window.confirm('Bạn muốn đăng xuất khỏi tài khoản?')){
                      setStoreJson(USER_LOGIN,'');
                      setUserToken({email:userToken.email,token:''})
                      window.location.reload();
                    }
                  }}>Logout</Link></li>}
                  <li><Link className="dropdown-item" to={'register'}>Sign in</Link></li>
                  {userLogin?.user.role=="ADMIN"&&<li><Link className="dropdown-item" to='admin/user'>Đi tới trang admin</Link></li>}
                </ul>
    </div>
  </div>;
};

export default Header;
