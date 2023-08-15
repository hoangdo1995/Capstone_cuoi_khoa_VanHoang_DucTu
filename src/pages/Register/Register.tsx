import React from "react";
import '../../scss/components/register.scss'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { type } from "@testing-library/user-event/dist/type";
import { DispatchType } from "../../redux/store";
import { registerAsyncApi } from "../../redux/UserReducer/UserReducer";
import { PASSWORD_REGEX, PHONE_VN_REGEX } from "../../util/config";

export type UserRegisterModel = {
  id: string,
  name: string,
  email: string,
  phone: string,
  gender: boolean,
  birthday: string,
  password: string,
  confirmPassword: string
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
      gender: true,
      password: '',
      confirmPassword: '',

    },
    validationSchema: yup.object().shape({
      email: yup.string().required('email không được bỏ trống!!').email('email không hợp lệ'),
      password: yup.string().min(4, 'password phải 4 kí tự ').required('password không được bỏ trống!!').matches(PASSWORD_REGEX, "Password sai định dạng!"),
      confirmPassword: yup
        .string()
        .required("Password không được để trống!")
        .oneOf([yup.ref("password")], "Không khớp với password!"),
      phone: yup
        .string()
        .required("Phone không được để trống!")
        .matches(PHONE_VN_REGEX, "Phone sai định dạng!"),
      gender: yup.boolean(),

    }),
    onSubmit: (values: UserRegisterModel) => {
      const asyncActionRegister = registerAsyncApi(values);
      dispatch(asyncActionRegister);
    }
  })


  return (<div className="registation">
    <div className='form-box register' >
      <h2>Registration</h2>
      <form onSubmit={frmRegister.handleSubmit}>
        <div className="row">
          <div className="col-6 item1">
            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-user" /></span>
              <input className="form-control" type="text" name="username" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} />
              <label> Username</label>

            </div>
            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-lock" /></span>
              <input className="form-control" type="password" name="password" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} />
              <label> Password</label>

            </div>
            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-lock" /></span>
              <input className="form-control" type="password" name="password" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} />
              <label> Confirmpassword</label>

            </div>
          </div>
          <div className="col-6 item2">
            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-envelope" /></span>
              <input className="form-control" type="email" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} name="email" />
              <label> Email</label>

            </div>
            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-phone" /></span>
              <input className="form-control" type="text" onChange={frmRegister.handleChange} onBlur={frmRegister.handleBlur} name="phone" />
              <label> Phone</label>

            </div>
            <div className="remember-forgot check form-group mt-5">
              <input name="gender" type='radio' /> Male
              <input name="gender" type='radio' />Female
            </div>
          </div>
        </div>
        <div className="remember-forgot condition">
          <label><input type="checkbox" />I agree to the terms &amp; conditions</label>
          <a href="$"> Forgot password</a>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  </div>

  )

}