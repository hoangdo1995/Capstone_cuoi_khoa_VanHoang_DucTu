import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { type } from '@testing-library/user-event/dist/type'
import { loginAsyncApi } from '../../redux/UserReducer/UserReducer'
import { DisabledType } from 'antd/es/config-provider/DisabledContext'
import { useDispatch } from 'react-redux'
import { DispatchType } from '../../redux/store'
import '../../scss/components/login.scss'
export type UserLoginModel = {
  email: string,
  password: string
}

type Props = {}

export default function Login({ }: Props) {
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
    onSubmit: (values: UserLoginModel) => {
      const asyncActionLogin = loginAsyncApi(values);
      dispatch(asyncActionLogin);
    }
  })


  return (
    // <form className='container' onSubmit={frmLogin.handleSubmit}>
    //   <div className='d-felx justify-content-center align-items-center' >
    //     <div className='w-100'>
    //       <h3>Login</h3>
    //       <div className='form-group'>
    //         <p>Email</p>
    //         <input name='email' type="email" className='form-control' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
    //         {frmLogin.errors.email && <div className='text text-danger'>{frmLogin.errors.email} </div>}
    //       </div>
    //       <div className='form-group'>
    //         <p>Password</p>
    //         <input name='password' type="password" className='form-control' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
    //         {frmLogin.errors.password && <div className='text text-danger'>{frmLogin.errors.password} </div>}
    //       </div>
    //       <div className='form-group'>
    //         <button className='btn btn-primary mt-2' type='submit'>Login</button>
    //       </div>
    //     </div>
    //   </div>
    // </form>
    
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