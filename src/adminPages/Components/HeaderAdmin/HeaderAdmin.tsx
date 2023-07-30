import React from "react";

type Props = {};

const HeaderAdmin = (props: Props) => {
  return <div className="d-flex justify-content-end align-items-center border headerAdmin" style={{}}>
    <div className="name">Admin</div>
    <button className="icon btnDefault">
        <i className="fa fa-user"></i>
    </button>
    <button className="directIcon btnDefault">
      <i className="fa fa-chevron-circle-down"></i>
    </button>
  </div>;
};

export default HeaderAdmin;
