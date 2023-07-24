import React, { useEffect,useState } from "react";
import {NavLink,Link} from 'react-router-dom'
type Props = {};

const Header = (props: Props) => {
  let [iconTheme,setIconTheme] = useState(<i className="fa fa-sun"></i>);
  useEffect(()=>{

  },[])
  return <div className="d-flex justify-content-between py-3 container">
            <NavLink to={''} className="fs-2 fw-bolder d-flex align-items-center logo">
              <i className="fab fa-airbnb me-2 fw-bolder fs-1"></i>AirBnB
            </NavLink>
            <button className="rounded-pill d-flex bg-light align-items-center justify-content-center searchNav ps-2 pe-1">
                <span className="border-end border-1 border-secondary">Nơi ở</span>
                <span className="border-end border-2 border-secondary-subtle">Trải nghiệm</span>
                <span className="">Trải nghiệm trực tuyến <i className="fa fa-search ms-2"></i></span>
            </button>
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
                  <li><Link className="dropdown-item" to={'#'}>Log in</Link></li>
                  <li><Link className="dropdown-item" to={'#'}>Sign in</Link></li>
                </ul>

            </div>
  </div>;
};

export default Header;
