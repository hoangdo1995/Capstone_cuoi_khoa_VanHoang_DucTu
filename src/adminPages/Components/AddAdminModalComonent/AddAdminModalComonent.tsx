import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { DispatchType, RootState } from "../../../redux/store";
import { NAME_REGEX, PASSWORD_REGEX, PHONE_VN_REGEX, http, httpNonAuth } from "../../../util/config";
import dayjs from "dayjs";

type Props = {};

const AddAdminModalComonent = (props: Props) => {
    const userInforFromReducer = useSelector((state:RootState)=>state.UserInforReducer.value);
    const userInforState= useSelector((state:RootState)=>state.UserInforReducer.state);
    //xử lý đăng ký
    const dispatch:DispatchType = useDispatch();
    
    
    let formik = useFormik({
        initialValues: {
          id: 0,
          name:      "",
          email:     "",
          password:  "",
          phone:     "",
          birthday:  "",
          avatar:    "",
          gender:    true,
          role:      "",
        },
        onSubmit: async (values) => {
      const registervalues = {...values,id:'0'}
  
      const res = await httpNonAuth.post('/api/auth/signup',registervalues);
      if(res.status===200){
          alert('Tạo tài khoản thành công!');
      }
      console.log(formik.values);
      
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email không được để trống!")
        .email("Email sai định dạng!"),
      name: yup
        .string()
        .required("Name không được để trống!")
       ,
      password: yup
        .string()
        .required("Password không được để trống!")
        .matches(PASSWORD_REGEX, "Password sai định dạng!"),
      phone: yup
        .string()
        .required("Phone không được để trống!")
        .matches(PHONE_VN_REGEX, "Phone sai định dạng!"),
      birthday:yup
        .string()
        .required('Ngày sinh không được để trống'),
        
      gender: yup.boolean().required("Gender không được để trống!"),
      role:yup
      .string()
      .required('Chức vụ không được để trống!')
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
      formik.setValues(userInforFromReducer);
    }
  },[userInforFromReducer,userInforState]);
  

  return <div className="modal fade modal-lg" id="paginationBar" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Quản lý người dùng</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
            <form className="content row" onSubmit={formik.handleSubmit}>
                <div className="col-6 mb-3">
                  <p className="pb-0">Tên</p>
                  <input type="text" id="name" className="w-100 mb-0" onChange={formik.handleChange} defaultValue={formik.values.name} />
                  {formik.errors.name&&<p className='text-danger position-absolute pt-0'>{formik.errors.name}</p>}
                </div>
                <div className="col-6 mb-3">
                  <p className="pb-0">Email</p>
                  <input type="text" id="email" onChange={formik.handleChange} className="w-100" defaultValue={formik.values.email}/>
                  {formik.errors.email&&<p className='text-danger position-absolute pt-0'>{formik.errors.email}</p>}
                </div>
                <div className="col-6 mb-3">
                  <p className="pb-0">Số điện thoại</p>
                  <input type="text" id="phone" onChange={formik.handleChange} className="w-100" defaultValue={dayjs(formik.values.phone).format('YYYY-DD-MM')}/>
                  {formik.errors.phone&&<p className='text-danger position-absolute pt-0'>{formik.errors.phone}</p>}
                </div>
                <div className="col-6 mb-3">
                  <p className="pb-0">Mật khẩu</p>
                  <input type="password" id="password" onChange={formik.handleChange} className="w-100" defaultValue={formik.values.password}/>
                  {formik.errors.password&&<p className='text-danger position-absolute pt-0'>{formik.errors.password}</p>}
                </div>
                <div className="col-6 mb-3">
                  <p className="pb-0">Ngày sinh</p>
                  <input type="date" id="birthday" onChange={formik.handleChange} className="w-100" defaultValue={formik.values.birthday}/>
                  {formik.errors.birthday&&<p className='text-danger position-absolute pt-0'>{formik.errors.birthday}</p>}
                </div>
                <div className="col-6 mb-3">
                  <p className="pb-0">Gender</p>
                  <label className="mx-2">Nam</label>
                    <input type="radio" id="gender1" name="gender" value="true" checked={formik.values.gender} onChange={handleSelectGender} />
                    <label className="mx-2">Nữ</label>
                    <input type="radio" id="gender2" name="gender" value='false' checked={!formik.values.gender} onChange={handleSelectGender} />
                    {formik.errors.gender&&<p className='text-danger position-absolute pt-0'>{formik.errors.gender}</p>}
                </div>
                <div className="col-6 mb-3">
                  <p className="pb-0">Phân quyền</p>
                    <div>
                    <label className="mx-2">Admin</label>
                    <input type="radio" id="role1" name="role" value="ADMIN" checked={formik.values.role==='ADMIN'?true:false} onChange={handleSelectRole}/>
                    <label className="mx-2">User</label>
                    <input type="radio" id="role2" name="role" value="USER" checked={formik.values.role==='USER'?true:false} onChange={handleSelectRole}/>
                    </div>
                    {formik.errors.role&&<p className='text-danger position-absolute pt-0'>{formik.errors.role}</p>}
                </div>
                <div className="w-100 d-flex justify-content-end">
                    {(userInforState=='add')&&<button type="submit"  className="btn btn-primary me-3">Thêm</button>}

                    {(userInforState=='edit')&&<button className="btn btn-primary me-3" onClick={async(event)=>{
                      event.preventDefault()
                      if(window.confirm(`Bạn muốn thay đổi thông tin người dùng ${formik.values.name}?`)){
                        const headers = {
                          tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzMiLCJIZXRIYW5TdHJpbmciOiIwNi8wMi8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MDcxNzc2MDAwMDAiLCJuYmYiOjE2ODk2OTk2MDAsImV4cCI6MTcwNzMyNTIwMH0.Ti8xtGGllk9j0u36EAuC9HOWsXJ7QELlIx8X5mDHaEE',
                          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMzgiLCJlbWFpbCI6ImhvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwibmJmIjoxNjkyMDU2ODQyLCJleHAiOjE2OTI2NjE2NDJ9.232nFZXfho9yslAnyMZEKEQ0N_Zrw1l5xy05x31Sh5Q'
                        };
                        try{
                          const res = await http.put(`/api/users/${formik.values.id}`,formik.values,{headers})
                          if(res.status == 200){
                            alert('Chỉnh sửa người dùng thành công');
                            console.log(res);
                            window.location.reload();
                          }
                        }catch(err){
                          // alert(err)
                        }
                      }
                    }} >Chinh sửa</button>}

                    {(userInforState =='delete')&&<button className="btn btn-danger me-3" onClick={async(event)=>{
                        event.preventDefault();
                        if(window.confirm(`Bạn muốn xóa người dùng ${formik.values.name}!`)){
                          try{
                            const headers = {
                              tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU',
                              token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMzgiLCJlbWFpbCI6ImhvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwibmJmIjoxNjkyMDU2ODQyLCJleHAiOjE2OTI2NjE2NDJ9.232nFZXfho9yslAnyMZEKEQ0N_Zrw1l5xy05x31Sh5Q'
                            };
                            const res = await http.delete(`/api/users?id=${formik.values.id}`,{headers})
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

                    {(userInforState !=='detail')&&<button className="btn btn-secondary" data-bs-dismiss="modal" >Hủy</button>}
                </div>
            </form>
        </div>
      </div>
    </div>
  </div>;
};

export default AddAdminModalComonent;
