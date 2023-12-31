import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

const AdminNavbar = (props: Props) => {
  return (<div className="border border-1 navHeader" style={{height:'100vh'}}>
        <div className="navMenuHeader d-flex justify-content-between align-items-center border-bottom">
            <div className="navTitle">Dashboard</div>
            <button className="border-0 bg-transparent toogleBtn"><i className="fa fa-align-justify"></i></button>
        </div>
        <nav className="nav flex-column navMenu">
            <NavLink className={({isActive})=>isActive?'NavLink fw-bolder text-danger':'NavLink text-secondary'} to="user">Quản lý người dùng</NavLink>
            <NavLink className={({isActive})=>isActive?'NavLink fw-bolder text-danger':'NavLink text-secondary'} to="room">Quản lý thông tin phòng</NavLink>
        </nav>
  </div>)
};

export default AdminNavbar;
