import React,{useEffect,useState} from "react";
import { http, httpNonAuth, isTimeInRange } from "../../util/config";
import { useParams } from "react-router-dom";
import { BookRoomType, CommentType, LocationType, RoomDetailType } from "../../components/Modal/UtilModel";
import CommentItem from "../../components/CommentItem/CommentItem";
import DatePickerComponent from "../../components/DatePicker/DatePicker";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { DaySelectType } from "../../components/Modal/UtilModel";
import dayjs, { Dayjs } from "dayjs";
import { boolean } from "yup";

type Props = {};

const RoomDetailPage = (props: Props) => {
  const currentDay = dayjs();
  const initDaySelect:DaySelectType = {
    startDay:currentDay.format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    endDay:currentDay.format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    rangeDay:0
  }
  let [daySelect,setDaySelect] = useState<DaySelectType|null>();
  const handleChildStateChange = async(newState:DaySelectType|null) => {
      await setDaySelect(newState);
  };
  let [detail,setDetail] = useState<RoomDetailType>();
  let [quantity,setQuantity] = useState<number>(0);
  let [comments,setComments] = useState<CommentType[]>();
  let [location,setLocation] = useState<LocationType>();
  let [textareaValue, setTextareaValue] = useState('');

  let {id} = useParams();
  const getRoomDetail:()=>void = async()=>{
      let data = await httpNonAuth(`/api/phong-thue/${id}`);
      setDetail(data.data.content);
  }

  const getComments = async()=>{
    let res = await httpNonAuth(`/api/binh-luan/lay-binh-luan-theo-phong/${id}`);
    setComments(res.data.content);
  }

  const getLocation = async()=>{
    if(id){
      let res = await httpNonAuth(`/api/vi-tri/${id}`);
      if(res){
        setLocation(res.data.content)
      }
    }
  }

  //Xử lý comment
  const handleTextareaChange = (event:any) => {
    setTextareaValue(event.target.value);
  };
  const comment = async()=>{
    if(textareaValue.trim()!=''){
        const comment = {
          id: 0,
          maPhong: id,
          maNguoiBinhLuan: 3238,
          ngayBinhLuan: new Date(),
          noiDung: textareaValue,
          saoBinhLuan: 1
        }
        const headers = {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMzgiLCJlbWFpbCI6ImhvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwibmJmIjoxNjkxOTA4NTc4LCJleHAiOjE2OTI1MTMzNzh9.WQjhCjUOsT44-fB3He-JMmIWeMPpvWP031K2RDp_No0',
          tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzMiLCJIZXRIYW5TdHJpbmciOiIwNi8wMi8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MDcxNzc2MDAwMDAiLCJuYmYiOjE2ODk2OTk2MDAsImV4cCI6MTcwNzMyNTIwMH0.Ti8xtGGllk9j0u36EAuC9HOWsXJ7QELlIx8X5mDHaEE',
          Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzMiLCJIZXRIYW5TdHJpbmciOiIwNi8wMi8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MDcxNzc2MDAwMDAiLCJuYmYiOjE2ODk2OTk2MDAsImV4cCI6MTcwNzMyNTIwMH0.Ti8xtGGllk9j0u36EAuC9HOWsXJ7QELlIx8X5mDHaEE'
        };
        const res = await http.post('/api/binh-luan',comment,{headers});
        console.log(res);
        
    }
    

    
}
  // hàm kiểm tra phòng đã có người đặt chưa
  const checkRoom = async()=>{
      let result:boolean = true;
      const res = await httpNonAuth('https://airbnbnew.cybersoft.edu.vn/api/dat-phong');
      const bookTimeList = res.data.content;
      
      bookTimeList.forEach((books:any) => {
        if(daySelect&&books&&detail){
          if(daySelect.startDay&&daySelect.endDay&&books.ngayDen&&books.ngayDi){
            const kq1 = isTimeInRange(new Date(daySelect.startDay), new Date(books.ngayDen), new Date(books.ngayDi))
            const kq2 = isTimeInRange(new Date(daySelect.endDay), new Date(books.ngayDen), new Date(books.ngayDi))
            const kq3 = detail.id==books.maPhong;  
            if((kq1||kq2)&&(detail.id==books.maPhong)){
                result = false;
            } ;
          }
        }
        
      });
      return result;
  }
  
  const bookRoom = async()=>{
    let bookInfor:BookRoomType;
    if(detail&&quantity){
      bookInfor = {
        id:           1,
        maPhong:      detail.id,
        ngayDen:      daySelect?.startDay,
        ngayDi:       daySelect?.endDay,
        soLuongKhach: quantity,
        maNguoiDung:  3238
      }
      const dk =await checkRoom();
      if(dk){
        console.log()
        
        const res = await httpNonAuth.post(`/api/dat-phong`,bookInfor);
        if(res.status===200||res.status===201){
        alert('Bạn đã đặt phòng thành công!')
        }
      }
      else{
        alert('Phòng đã có người đặt!')
      }
    }  
  }
  useEffect(()=>{
      getRoomDetail();
      getComments();
      checkRoom();
      getLocation();
      console.log('resset');
      
  },[]);
  
  return <div className="detail-page container">
        <div className="title">
          <h3 className="name">Amazing Relax Condo In {location?.tenViTri}</h3>
          <div className="rate-share d-flex justify-content-between">
            <div className="rate">
              <span><i className="fa fa-star"></i>4.48(10 đánh giá)</span>
              <span><i className="fa fa-medal"></i>Chủ nhà siêu cấp</span>
              <span>{location?.tenViTri}, {location?.tinhThanh}-{location?.quocGia}</span> 
            </div>
            <div className="share">
              <span><i className="fa fa-share"></i>Chia sẻ</span>
              <span><i className="fa fa-thumbs-up"></i>Lưu</span>
            </div>
          </div>
        </div>
        <div className="image">
          <img src={detail?.hinhAnh} alt="" />
        </div>
        <div className="content d-flex">
          <div className="room-detail">
              <div className="room-infor d-flex justify-content-between border-bottom">
                <div className="room-name">
                  <h4 className="name">{detail?.tenPhong}</h4>
                  <div className="tags d-flex">
                    <div className="tag d-flex align-items-center m-0 p-0">
                      <span className="tag-text">{detail?.phongNgu} phòng ngủ</span>
                    </div>
                    <div className="tag d-flex align-items-center m-0 p-0">
                      <i className="fa fa-dot-circle"></i>
                      <span className="tag-text">{detail?.phongTam} phòng tắm</span>
                    </div>
                    <div className="tag d-flex align-items-center m-0 p-0">
                      <i className="fa fa-dot-circle"></i>
                      <span className="tag-text">{detail?.giuong} giường</span>
                    </div>
                  </div>
                </div>
                <div className="room-lease">
                  <img src="https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600w-2107967969.jpg" alt="" />
                </div>
              </div>
              <div className="room-details border-bottom">
                <div className="detail">
                  <div className="icon"><i className="fa fa-home"></i></div>
                  <div className="content-detail">
                    <h4>Toàn bộ nhà</h4>
                    <p>Bạn sẽ có chung cư cao cấp nhất chi riêng mình</p>
                  </div>
                </div>
                <div className="detail">
                  <div className="icon"><i className="fa fa-certificate"></i></div>
                  <div className="content-detail">
                    <h4>Vệ sinh tăng cường</h4>
                    <p>Chủ nhà này đã cam kết thực hiện quy trình về tăng cường 5 bước của Airbnb</p>
                  </div>
                </div>
                <div className="detail">
                  <div className="icon"><i className="fa fa-medal"></i></div>
                  <div className="content-detail">
                    <h4>Phòng là chủ nhà siêu cấp</h4>
                    <p>Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm được đánh giá cao và là những người cam kết mang lại qiangx thời gian tuyệt vời khi ở lại</p>
                  </div>
                </div>
                <div className="detail">
                  <div className="icon"><i className="fa fa-calendar-check"></i></div>
                  <div className="content-detail">
                    <h4>Miễn phí hủy phòng trong 48h</h4>
                  </div>
                </div>
              </div>
              <div className="convenient border-bottom">
                <h5>Tiện nghi</h5>
                <div className="covenient-content row">
                  {detail?.mayGiat&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                  <img src="../images/icon/washing-machine.png" alt="" />
                  <span className="tag-text">máy giặc</span>
                  </div>}
                  {detail?.banLa&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                  <img src="../images/icon/iron2.png" alt="" />
                    <span className="tag-text">bàn là</span>
                  </div>}
                  {detail?.banUi&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                    <img src="../images/icon/iron.png" alt="" />
                    <span className="tag-text">bàn ủi</span>
                  </div>}
                  {detail?.tivi&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                  <img src="../images/icon/television.png" alt="" />
                    <span className="tag-text">Tivi với truyền hình cáp chuẩn</span>
                  </div>}
                  {detail?.dieuHoa&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                  <img src="../images/icon/air-conditioner.png" alt="" />
                    <span className="tag-text">Điều hòa nhiệt độ</span>
                  </div>}
                  {detail?.wifi&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                  <img src="../images/icon/wifi.png" alt="" />
                    <span className="tag-text">Wifi</span>
                  </div>}
                  {detail?.bep&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                    <img src="../images/icon/kitchen.png" alt="..." />
                    <span className="tag-text">Bếp</span>
                  </div>}
                  {detail?.doXe&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                  <img src="../images/icon/parking-area.png" alt="" />
                    <span className="tag-text">Đổ xe miễn phí</span>
                  </div>}
                  {detail?.hoBoi&&<div className="tag d-flex col-6 align-items-center m-0 p-0">
                  <img src="../images/icon/swimming-pool.png" alt="" />
                    <span className="tag-text">Hồ bơi tiêu chuẩn</span>
                  </div>}
                </div>
              </div>
            </div>
            <div className="booking">
              <div className="booking-content">
                <div className="price d-flex justify-content-between">
                  <h5><span>${detail?.giaTien}</span>/đêm</h5>
                  <p><i className="fa fa-star"></i>4,89 (18 đánh giá)</p>
                </div>
                <div className="book-infor">
                    {<DatePickerComponent onStateChange={handleChildStateChange}/>}
                  <div className="btn btn-primary quantity-select d-flex justify-content-between align-items-center" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <div className="quantity d-flex flex-column">
                      <span className="title">Khách</span>
                      <span className="value">{quantity} khách</span>
                    </div>
                    <div className="icon">
                    <i className="fa fa-chevron-circle-down"></i>
                    </div>
                  </div>
                  <div className="collapse" id="collapseExample">
                    <div className="d-flex justify-content-between align-items-center collapse-content">
                        <div className="title">
                          <p className="text1">Người lớn</p>
                          <p className="text2">từ 13 tuổi trở lên</p>
                        </div>
                        <div className="choose d-flex align-items-baseline">
                          <button className="d-flex justify-content-center align-items-center" onClick={()=>{
                            if(quantity>0){
                              setQuantity(quantity-1)
                            }
                            else{
                              setQuantity(0);
                            }
                          }}>-</button>
                          <span className="">{quantity}</span>
                          <button className="d-flex justify-content-center align-items-center" onClick={()=>{setQuantity(quantity+1)}}>+</button>
                        </div>
                  </div>
                </div>
                </div>
                <button onClick={()=>{
                  bookRoom();
                }}>Đặt phòng</button>
                <p className="alert-text d-flex justify-content-center">Bạn vần chưa bị trừ tiền</p>
                <div className="bill">
                  <div className="bill-item d-flex justify-content-between">
                    <p className="service">${detail?.giaTien}x{daySelect?.rangeDay?daySelect?.rangeDay:0} đêm</p>
                    <p className="money">${(detail?.giaTien?detail?.giaTien:0)*(daySelect?.rangeDay?daySelect?.rangeDay:0)}</p>
                  </div>
                  <div className="bill-item d-flex justify-content-between">
                    <p className="service">phí dịch vụ</p>
                    <p className="money">$21</p>
                  </div>
                  <div className="bill-total d-flex justify-content-between border-top border-2">
                    <p className="total">Tổng</p>
                    <p className="money">${(detail?.giaTien?detail?.giaTien:0)*(daySelect?.rangeDay?daySelect?.rangeDay:0)+21}</p>
                  </div>
                </div>
              </div>
              <div className="report d-flex justify-content-center">
                <p><i className="fa fa-flag"></i> Báo cáo nhà/không cho thuê phòng này</p>
              </div>
            </div>
        </div>
        <div className="comment">
          <div className="comment-container content row">
            {comments?.map((comment,index)=><CommentItem content={comment}/>)}
          </div>
          <div className="comment-box content">
            <div className="box">
              <textarea rows={4} id="comment" onChange={handleTextareaChange}/>
            </div>
            <button onClick={()=>{comment()}} >Add Comment</button>
          </div>
        </div>
  </div>;
};

export default RoomDetailPage;
