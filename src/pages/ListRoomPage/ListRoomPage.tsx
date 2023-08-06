import React, { useEffect, useState } from "react";
import RoomItem from "../../components/RoomItem/RoomItem";
import { httpNonAuth } from "../../util/config";
import { RoomDetailType } from "../../components/Modal/UtilModel";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Props = {};

const ListRoomPage = (props: Props) => {
  const locationId = useSelector((state:RootState)=>state.PositionSearchReducer?.value?.id);
  let [listRoom,setListRoom] = useState<RoomDetailType[]>();
  const getListRoom = async()=>{
      let data = await httpNonAuth.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`);
      console.log(data.data.content);
      setListRoom(data.data.content);
  }
  useEffect(()=>{
    getListRoom();
    window.scrollTo(0, 0);
  },[locationId]);
  return <div className="list-room-page container pb-3">
      <div className="content d-flex row">
        <div className="list-room col-7">
            <div className="title">
              <h5>Hơn {listRoom?.length} chổ ở 16 th4 - 20 th5</h5>
              <h4>Chổ ở tại khu vực bản đồ đã chọn</h4>
              <div><span className="filter-tag">Loại nơi ở</span><span className="filter-tag">Giá</span><span className="filter-tag">Phòng và phòng ngủ</span><span className="filter-tag">Bộ lọc khác</span></div>
            </div>
            {listRoom?.map((item,index)=><RoomItem data={item}/>)}
        </div>
        <div className="map col-5">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12900.980416099572!2d106.69231204246603!3d10.775105159528863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x1787491df0ed8d6a!2sIndependence%20Palace!5e0!3m2!1sen!2s!4v1691304910014!5m2!1sen!2s" width="100%" height="509px" style={{border:0}}></iframe> 
        </div>
      </div>
  </div>;
};

export default ListRoomPage;
