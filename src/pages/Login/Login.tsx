import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { type } from '@testing-library/user-event/dist/type'
import { loginAsyncApi } from '../../redux/UserReducer/UserReducer'
import { DisabledType } from 'antd/es/config-provider/DisabledContext'
import { useDispatch } from 'react-redux'
import { DispatchType } from '../../redux/store'
import '../../scss/components/login.scss'
import { UserLoginType } from '../../components/Header/Header'
import { USER_LOGIN, getStoreJson } from '../../util/config'
import { history } from '../..'
import { setModalStateReducer } from '../../redux/reducers/ModalReducer'
export type UserLoginModel = {
  email: string,
  password: string
}

type Props = {
}

export default function Login(props: Props) {
  const dispatch: DispatchType = useDispatch();
  const frmLogin = useFormik<UserLoginModel>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('email không được bỏ trống!!').email('email không hợp lệ'),
      password: yup.string().min(4, 'password phải 4 kí tự ').required('password không được bỏ trống!!')

    }),
    onSubmit: async(values: UserLoginModel) => {
      const asyncActionLogin = loginAsyncApi(values);
      const result = await dispatch(asyncActionLogin);

      if(result.payload){
        alert('Đăng nhập thành công!!');
        history.push('/profile');
      } 
    }
  })
  return (
    <div className="form-box login ">
      <h2>Login</h2>
      <form  onSubmit={frmLogin.handleSubmit}>
        <div className="input-box form-group">
          <span className="icon"><i className="fa fa-envelope" /></span>
          <input type="email" name='email' className='form-control' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur}  />
          {frmLogin.errors.email && <div className='text text-danger'>{frmLogin.errors.email} </div>}
          <label> Email</label>
        </div>
        <div className="input-box form-group">
          <span className="icon"><i className="fa fa-lock" /></span>
          <input type="password" className='form-control' name='password' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur}  />
          {frmLogin.errors.password && <div className='text text-danger'>{frmLogin.errors.password} </div>}
          <label> Password</label>
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="$"> Forgot password</a>
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>

  )
}