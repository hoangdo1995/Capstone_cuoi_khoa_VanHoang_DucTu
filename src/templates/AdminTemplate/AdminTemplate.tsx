import React from "react";
import AdminNavbar from "../../adminPages/Components/AdminNavbar";
import HeaderAdmin from "../../adminPages/Components/HeaderAdmin/HeaderAdmin";
import { Outlet } from "react-router-dom";

type Props = {};

const AdminTemplate = (props: Props) => {
  return <div className="d-flex container" id='admin-page'>
    <div className="navbarAdmin" style={{width:'20%'}}>
        <AdminNavbar/>
    </div>
    <div className="content d-flex flex-column" style={{width:'80%'}}>
        <HeaderAdmin/>
        <div className="border border-1 w-100 contentPage">
            <Outlet/>
        </div>
    </div>
  </div>;
};

export default AdminTemplate;
