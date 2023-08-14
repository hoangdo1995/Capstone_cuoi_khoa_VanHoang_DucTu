import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { DispatchType, RootState } from "../../../redux/store";
import { NAME_REGEX, PASSWORD_REGEX, PHONE_VN_REGEX, httpNonAuth } from "../../../util/config";
import { UserType } from "../../../components/Modal/UtilModel";

type Props = {};

const AddAdminModalComonent = (props: Props) => {
    const userInforFromReducer = useSelector((state:RootState)=>state.UserInforReducer.value);
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
  if(formik.values.role&&formik.values.gender){
    document.querySelectorAll(`[name='gender']`)?.forEach((item)=>item.setAttribute('checked','false'))
  document.querySelector(`[name='gender'][value=${formik.values.gender}]`)?.setAttribute('checked','true');
  document.querySelectorAll(`[name='role']`)?.forEach((item)=>item.setAttribute('checked','false'));
  document.querySelector(`[name='role'][value=${formik.values.role}]`)?.setAttribute('checked','true');
  console.log(document.querySelector(`[name='role'][value=${formik.values.role}]`),document.querySelector(`[name='gender'][value=${formik.values.gender}]`));
  }
  useEffect(()=>{
    
    if (formik) {
      formik.setValues(userInforFromReducer);
        if(formik.values.role&&formik.values.gender){
          document.querySelectorAll(`[name='gender']`)?.forEach((item)=>item.setAttribute('checked','false'))
          console.log(document.querySelectorAll(`[name='gender']`));
          
        document.querySelector(`[name='gender'][value=${formik.values.gender}]`)?.setAttribute('checked','true');
        document.querySelectorAll(`[name='role']`)?.forEach((item)=>item.setAttribute('checked','false'));
        document.querySelector(`[name='role'][value=${formik.values.role}]`)?.setAttribute('checked','true');
        console.log(document.querySelector(`[name='role'][value=${formik.values.role}]`),document.querySelector(`[name='gender'][value=${formik.values.gender}]`));
        }
        
    }
  },[userInforFromReducer]);
  

  return <div className="modal fade modal-lg" id="paginationBar" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm quản trị viên</h1>
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
                  <input type="text" id="phone" onChange={formik.handleChange} className="w-100" defaultValue={formik.values.phone}/>
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
                    <input type="radio" id="gender1" name="gender" value="true" onChange={formik.handleChange} />
                    <label className="mx-2">Nữ</label>
                    <input type="radio" id="gender2" name="gender" value='false' onChange={formik.handleChange} />
                    {formik.errors.gender&&<p className='text-danger position-absolute pt-0'>{formik.errors.gender}</p>}
                </div>
                <div className="col-6 mb-3">
                  <p className="pb-0">Phân quyền</p>
                    <div>
                    <label className="mx-2">Admin</label>
                    <input type="radio" id="role1" name="role" value="ADMIN" onChange={formik.handleChange}/>
                    <label className="mx-2">User</label>
                    <input type="radio" id="role2" name="role" value="USER" onChange={formik.handleChange}/>
                    </div>
                    {formik.errors.role&&<p className='text-danger position-absolute pt-0'>{formik.errors.role}</p>}
                </div>
                <div className="w-100 d-flex justify-content-end">
                <button type="submit"  className="btn btn-primary me-3" >Thêm</button>
                <button  className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  </div>;
};

export default AddAdminModalComonent;
