import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  return <div className="container">
    <div className="d-flex justify-content-around row footer-product">
        <div className="d-flex flex-column col-md-3 col-sm-6">
            <p>GIỚI THIỆU</p>
            <Link to={''}>Phương thức hoạt động của AirBnB</Link>
            <Link to={''}>Trang tin tức</Link>
            <Link to={''}>Nhà đầu tư</Link>
            <Link to={''}>Airbnb plus</Link>
            <Link to={''}>Airbnb Luxe</Link>
            <Link to={''}>HotelTonight</Link>
            <Link to={''}>Airbnb for Work</Link>
            <Link to={''}>Nhờ có Host, mọi điều đều có thế</Link>
            <Link to={''}>Cơ hội nghề nghiệp</Link>
            <Link to={''}>Thư của nhà sáng lập</Link>
        </div>
        <div className="d-flex flex-column col-md-3 col-sm-6">
            <p>CỘNG ĐỒNG</p>
            <Link to={''}>Sự đa dạng và cảm giác thân thuộc</Link>
            <Link to={''}>Tiện nghi phù hợp cho người khuyết tật</Link>
            <Link to={''}>Đối tác liên kết Airbnb</Link>
            <Link to={''}>Chổ ở cho tuyến đầu</Link>
            <Link to={''}>Lượt giới thiệu của khách</Link>
            <Link to={''}>Airbnb.org</Link>
        </div>
        <div className="d-flex flex-column col-md-3 col-sm-6">
            <p>ĐÓN TIẾP KHÁCH</p>
            <Link to={''}>Cho thuê nhà</Link>
            <Link to={''}>Tổ chức Trải nghiệm trực tuyến</Link>
            <Link to={''}>Đón tiếp khách có trách nhiệm</Link>
            <Link to={''}>Trung tâm tài nguyên</Link>
            <Link to={''}>Trung tâm công cộng</Link>
        </div>
        <div className="d-flex flex-column col-md-3 col-sm-6">
          <p>HỔ TRỢ</p>
          <Link to={''}>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</Link>
          <Link to={''}>Trung tâm trợ giúp</Link>
          <Link to={''}>Các tùy chọn hủy</Link>
          <Link to={''}>Hổ trợ khu dân cư</Link>
          <Link to={''}>Tin cậy và an toàn</Link>
        </div>
    </div>
    <div className="footer-contact d-flex justify-content-between flex-md-row flex-sm-column">
        <div className="d-flex">
          <Link to={''}>&copy; 2021 Airbnb, Inc. All rights reserved</Link>
          <Link to={''}><li>Quyền riêng tư</li></Link>
          <Link to={''}><li>Điều khoản</li></Link>
          <Link to={''}><li>Sơ đồ trang web</li></Link>
        </div>
        <div className="d-flex">
        <Link to={''}><i className="fa fa-globe me-2"></i>Tiếng Việt(VN) <span className="mx-2">$ USD</span></Link>
        <Link to="{''}" ><i className="fab fa-facebook-f" /></Link>
        <Link to="{''}" ><i className="fab fa-twitter" /></Link>
        <Link to="{''}" ><i className="fab fa-instagram" /></Link>
        </div>
    </div>
  </div>;
};

export default Footer;
