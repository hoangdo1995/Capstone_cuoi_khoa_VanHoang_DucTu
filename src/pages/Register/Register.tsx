import React from "react";
import '../../scss/components/register.scss'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { type } from "@testing-library/user-event/dist/type";
import { DispatchType } from "../../redux/store";
import { registerAsyncApi } from "../../redux/UserReducer/UserReducer";

export type UserRegisterModel = {
  id: string,
  name: string,
  email: string,
  phone: string,
  gender: boolean,
  birthday: string
}
type Props = {};

export default function Register({ }: Props) {
  const dispatch: DispatchType = useDispatch();
  const frmRegister = useFormik<UserRegisterModel>({
    initialValues: {
      id: '',
      name: '',
      email: '',
      phone: '',
      birthday: '',
      gender:true,
    },
    validationSchema:yup.object().shape({
      email:yup.string().required('email không được bỏ trống!!').email('email không hợp lệ')
    }),
   onSubmit:(values:UserRegisterModel)=>{
    const asyncActionRegister =registerAsyncApi(values);
    dispatch(asyncActionRegister);
   }
  })
  
return (<div className="registation">
  <div className='form-box register' >
    <h2>Registration</h2>
    <form action="#" onSubmit={frmRegister.handleSubmit}> 
      <div className="row">
        <div className="col-6 item1">
          <div className="input-box">
            <span className="icon"><i className="fa fa-user" /></span>
            <input type="text"   onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} />
            <label> Username</label>

          </div>
          <div className="input-box">
            <span className="icon"><i className="fa fa-lock" /></span>
            <input type="password" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} />
            <label> Password</label>

          </div>
          <div className="input-box">
            <span className="icon"><i className="fa fa-lock" /></span>
            <input type="password" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} />
            <label> Confirmpassword</label>

          </div>
        </div>
        <div className="col-6 item2">
          <div className="input-box">
            <span className="icon"><i className="fa fa-envelope" /></span>
            <input type="email" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} />
            <label> Email</label>

          </div>
          <div className="input-box">
            <span className="icon"><i className="fa fa-phone" /></span>
            <input type="text" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} />
            <label> Phone</label>

          </div>
          <div className="remember-forgot check">
            <label><input type="checkbox" className="male" id="gridCheck" defaultChecked />Male</label>
            <label><input type="checkbox" className="female" id="gridCheck" defaultChecked />Female</label>
          </div>
        </div>
      </div>
      <div className="remember-forgot condition">
        <label><input type="checkbox" />I agree to the terms &amp; conditions</label>
        <a href="$"> Forgot password</a>
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
      <div className="login-register">
        <p>Already have an account? <a href="#" className="login-link">Login</a></p>
      </div>
    </form>
  </div>
</div>

)

}