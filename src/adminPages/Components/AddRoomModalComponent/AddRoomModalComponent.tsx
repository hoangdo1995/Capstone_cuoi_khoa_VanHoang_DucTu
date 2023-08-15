import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { DispatchType, RootState } from "../../../redux/store";
import { NAME_REGEX, PASSWORD_REGEX, PHONE_VN_REGEX, http, httpNonAuth } from "../../../util/config";
import dayjs from "dayjs";

type Props = {};

const AddRoomModalComponent = (props: Props) => {
    const roomInforFromReducer = useSelector((state:RootState)=>state.RoomInforReducer.value);

    const roomInforState= useSelector((state:RootState)=>state.RoomInforReducer.state);
    //xử lý đăng ký
    const dispatch:DispatchType = useDispatch();

    
    let formik = useFormik({
        initialValues: {
            id:       0,
            tenPhong: '',
            khach:    0,
            phongNgu: 0,
            giuong:   0,
            phongTam: 0,
            moTa:     '',
            giaTien:  0,
            mayGiat:  false,
            banLa:    false,
            tivi:     false,
            dieuHoa:  false,
            wifi:     false,
            bep:      false,
            doXe:     false,
            hoBoi:    false,
            banUi:    false,
            maViTri:  0,
            hinhAnh:  '',
        },
        onSubmit: async (values) => {
            const valuesRoom = {...values,id:0}
            const headers = {
              tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU',
              token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyNzUiLCJlbWFpbCI6Im1heXhhbmRoMTk5NjE5OTVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNjkyMDYyOTUwLCJleHAiOjE2OTI2Njc3NTB9.0KKX2eABWnBWqpattTph0ay84r5_CRT18o2_W6aKhKE'
            };
      const res = await http.post('/api/phong-thue',valuesRoom,{headers});
      console.log(res);
      if(res.status===201){
          alert('Tạo phòng thành công!');
          window.location.reload();
      }
      console.log(formik.values);
      
    },
    validationSchema: yup.object().shape({
      tenPhong: yup
        .string()
        .required("Tên phòng không được để trống!"),
    khach:yup
    .number()
    .required('Không bỏ trống!'),
    phongNgu:yup
    .number()
    .required('Không bỏ trống!'),
    phongTam:yup
    .number()
    .required('Không bỏ trống!'),
    giuong:yup
    .number()
    .required('Không bỏ trống!'),
    giaTien:yup
    .number()
    .required('Không bỏ trống!'),
    hinhAnh:yup
    .string(),
    mayGiat:yup
    .boolean(),
    banLa:yup
    .boolean(),
    tivi:yup
    .boolean(),
    dieuHoa:yup
    .boolean(),
    wifi:yup
    .boolean(),
    bep:yup
    .boolean(),
    doXe:yup
    .boolean(),
    hoBoi:yup
    .boolean(),
    banUi:yup
    .boolean(),
    }),
    
  });
  
  const handleSelectGender = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = event.target;
    formik.setFieldValue('gender',(value==='true'?true:false));
  }
  const handleSelectRole = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = event.target;
    formik.setFieldValue('role',(value ==='ADMIN')?'ADMIN':'USER');
  }
  useEffect(()=>{
    if (formik) {
      formik.setValues(roomInforFromReducer);
    }
  },[roomInforFromReducer,roomInforState]);
  

  return <div className="modal fade modal-lg" id="addRoomModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Quản lý phòng</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
            <form className="content" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                  <p className="pb-0 mb-0">Tên phòng</p>
                  <input type="text" id="tenPhong" className="w-100 mb-0" onChange={formik.handleChange} value={formik.values.tenPhong} />
                  {formik.errors.tenPhong&&<p className='text-danger position-absolute pt-0'>{formik.errors.tenPhong}</p>}
            </div>
            <div className="row">
                <div className="col-3 mt-2">
                    <p className="pb-0 mb-0">Số khách tối đa</p>
                    <input type="number" id="khach" className="w-100 mb-0" onChange={formik.handleChange} value={formik.values.khach} />
                    {formik.errors.khach&&<p className='text-danger position-absolute pt-0'>{formik.errors.khach}</p>}
                </div> 
                <div className="col-3 mt-2">
                    <p className="pb-0 mb-0">Phòng ngủ</p>
                    <input type="number"id="phongNgu" className="w-100 mb-0" onChange={formik.handleChange} value={formik.values.phongNgu} />
                    {formik.errors.phongNgu&&<p className='text-danger position-absolute pt-0'>{formik.errors.phongNgu}</p>}
                </div>
                <div className="col-3 mt-2">
                    <p className="pb-0 mb-0">Phòng tắm</p>
                    <input type="number"id="phongTam" className="w-100 mb-0" onChange={formik.handleChange}  value={formik.values.phongTam}/>
                    {formik.errors.phongTam&&<p className='text-danger position-absolute pt-0'>{formik.errors.phongTam}</p>}
                </div>
                <div className="col-3 mt-2">
                    <p className="pb-0 mb-0">Giường</p>
                    <input type="number"id="giuong" className="w-100 mb-0" onChange={formik.handleChange} value={formik.values.giuong} />
                    {formik.errors.giuong&&<p className='text-danger position-absolute pt-0'>{formik.errors.giuong}</p>}
                </div>
                <div className="col-6 mt-2">
                    <p className="pb-0 mb-0">Gía tiền</p>
                    <input type="number"id="giaTien" className="w-100 mb-0" onChange={formik.handleChange} value={formik.values.giaTien} />
                    {formik.errors.giaTien&&<p className='text-danger position-absolute pt-0'>{formik.errors.giaTien}</p>}
                </div>
                <div className="col-6 mt-2">
                    <p className="pb-0 mb-0">Hình ảnh</p>
                    <input type="text" id="hinhAnh" className="w-100 mb-0" onChange={formik.handleChange} defaultValue={formik.values.hinhAnh} />
                    {formik.errors.hinhAnh&&<p className='text-danger position-absolute pt-0'>{formik.errors.hinhAnh}</p>}
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Máy giặc</span>
                    <input type="checkbox" id="mayGiat" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.mayGiat?true:false}/>
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Bàn là</span>
                    <input type="checkbox" id="banLa" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.banLa?true:false}/>
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Tivi</span>
                    <input type="checkbox" id="tivi" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.tivi?true:false} />
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Điều hòa</span>
                    <input type="checkbox" id="dieuHoa" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.dieuHoa?true:false}/>
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Wifi</span>
                    <input type="checkbox" id="wifi" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.wifi?true:false}/>
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Bếp</span>
                    <input type="checkbox" id="bep" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.bep?true:false}/>
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Đổ xe</span>
                    <input type="checkbox" id="doXe" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.doXe?true:false}/>
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Hồ bơi</span>
                    <input type="checkbox" id="hoBoi" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.hoBoi?true:false}/>
                </div>
                <div className="col-3 mt-2 d-flex justify-content-between pe-5">
                    <span className="pb-0 mb-0">Bàn ủi</span>
                    <input type="checkbox" id="banUi" className="mb-0 ms-1 d-inline" onChange={formik.handleChange} checked={formik.values.banUi?true:false}/>
                </div>
                <div className="col-12 mt-2">
                    <p className="pb-0 mb-0">Mã vị trí</p>
                    <input type="number" id="maViTri" className="w-25 mb-0" onChange={formik.handleChange} value={formik.values.maViTri} />
                </div>
                <div className="col-12 mt-2">
                    <p className="pb-0 mb-0">Mô tả</p>
                    <textarea rows={5} id="moTa" className="w-100 mb-0" onChange={formik.handleChange} value={formik.values.moTa}/>
                </div>
            </div>
            <div className="w-100 d-flex justify-content-end">
                    {(roomInforState=='add')&&<button type="submit" className="btn btn-primary me-3">Thêm</button>}

                    {(roomInforState=='edit')&&<button className="btn btn-primary me-3" onClick={async(event)=>{
                      event.preventDefault()
                      if(window.confirm(`Bạn muốn thay đổi thông tin người dùng ${formik.values.tenPhong}?`)){
                        const headers = {
                          tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU',
                          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyNzUiLCJlbWFpbCI6Im1heXhhbmRoMTk5NjE5OTVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNjkyMDYyOTUwLCJleHAiOjE2OTI2Njc3NTB9.0KKX2eABWnBWqpattTph0ay84r5_CRT18o2_W6aKhKE'
                        };
                        try{
                          const res = await http.put(`/api/phong-thue/${formik.values.id}`,formik.values,{headers})
                          if(res.status == 200||res.status == 201){
                            alert('Chỉnh sửa người dùng thành công');
                            window.location.reload();
                          }
                        }catch(err){
                          // alert(err)
                        }
                      }
                    }} >Chinh sửa</button>}

                    {(roomInforState =='delete')&&<button className="btn btn-danger me-3" onClick={async(event)=>{
                        event.preventDefault();
                        if(window.confirm(`Bạn muốn xóa người dùng ${formik.values.tenPhong}!`)){
                          try{
                            const headers = {
                              tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU',
                              token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyNzUiLCJlbWFpbCI6Im1heXhhbmRoMTk5NjE5OTVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNjkyMDYyOTUwLCJleHAiOjE2OTI2Njc3NTB9.0KKX2eABWnBWqpattTph0ay84r5_CRT18o2_W6aKhKE'
                            };
                            const res = await http.delete(`/api/phong-thue/${formik.values.id}`,{headers})
                          if(res.status == 200){
                            alert('Xóa người dùng thành công');
                            console.log(res);
                            window.location.reload();
                          }
                        }catch(err){
                          alert('Đã có lỗi!')
                        }
                      }
                    }}>Xóa người dùng</button>}

                    {(roomInforState !=='detail')&&<button className="btn btn-secondary" data-bs-dismiss="modal" >Hủy</button>}
                </div>
            </form>
        </div>
      </div>
    </div>
  </div>;
};

export default AddRoomModalComponent;

