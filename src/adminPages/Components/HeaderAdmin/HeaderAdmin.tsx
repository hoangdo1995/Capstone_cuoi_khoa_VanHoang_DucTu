import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const HeaderAdmin = (props: Props) => {
  return <div className="d-flex justify-content-end align-items-center border headerAdmin" style={{}}>
    <div className="name">Admin</div>
    <button className="icon btnDefault">
        <i className="fa fa-user"></i>
    </button>
    <button className="directIcon btnDefault" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i className="fa fa-chevron-circle-down"></i>
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <Link className="dropdown-item" to="/">Đi tới trang Airbnb</Link>
  </div>
  </div>;
};

export default HeaderAdmin;
