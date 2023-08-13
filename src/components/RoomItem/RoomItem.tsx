import React,{useState} from "react";
import { RoomDetailType } from "../Modal/UtilModel";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

type Props = {
  data?:RoomDetailType
};

const RoomItem = (props: Props) => {
  let location = useSelector((state:RootState)=>state.PositionSearchReducer?.value);
  let [like,setLike] = useState<boolean>(false);
  return <div className="room-item d-flex border-top py-4">
  <div className="room-image">
      <img src={props.data?.hinhAnh} alt="" />
  </div>
  <div className="room-infor mb-3">
      <p className="room-group">Toàn bộ căn hộ dịch vụ tại {location?.name}</p>
      <Link to={`/room-detail/${props.data?.id}`} className="room-name">{props.data?.tenPhong}</Link>
      <div className="room-tag d-flex" style={{flexWrap:'wrap'}}>
          <div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">{props.data?.phongNgu} phòng ngủ</span>
          </div>
          <div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">{props.data?.phongTam} phòng tắm</span>
          </div>
          <div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">{props.data?.giuong} giường</span>
          </div>
          {props.data?.mayGiat&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">máy giặc</span>
          </div>}
          {props.data?.banLa&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">bàn là</span>
          </div>}
          {props.data?.banUi&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">bàn ủi</span>
          </div>}
          {props.data?.tivi&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">Tivi</span>
          </div>}
          {props.data?.dieuHoa&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">Điều hòa</span>
          </div>}
          {props.data?.wifi&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">Wifi</span>
          </div>}
          {props.data?.bep&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">bếp</span>
          </div>}
          {props.data?.doXe&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">đổ xe</span>
          </div>}
          {props.data?.hoBoi&&<div className="tag d-flex align-items-center m-0 p-0">
            <i className="fa fa-dot-circle"></i>
            <span className="tag-text">hồ bơi</span>
          </div>}
      </div>
      <h3 className="room-price">${props.data?.giaTien}<span className="month-text">/tháng</span></h3>
      <div className="like-icon" onClick={()=>{
        setLike(!like);
      }}>
        {like?<img src="./images/icon/heart-like.png" alt="" />:<img src="./images/icon/heart-none-like.svg" alt="..." />}
      </div>
  </div>
</div>;
};

export default RoomItem;
