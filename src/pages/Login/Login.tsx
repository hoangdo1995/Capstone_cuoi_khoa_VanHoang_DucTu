import React, { Dispatch } from "react";
import { FormikValues, useFormik } from 'formik'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import { DispatchType } from "../../redux/store";
import { loginActionApi } from "../../redux/reducers/userReducer";
type Props = {};

export interface FormValue {
  email:string|null,
  password:string|null
}

const Login = (props: Props) => {
  const dispatch:DispatchType= useDispatch();
  const frm = useFormik<FormValue>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('email can not be blank!').email('email is invalid'),
      password: yup.string().required('password can not be blank')
    }),
    onSubmit: (values: FormValue) => {
      //đưa về redux để call api
      const actionAsync = loginActionApi(values);
      dispatch(actionAsync);
    }
  })


  return <form className="container" onSubmit={frm.handleSubmit}>
    <h4>Login</h4>
    <div className="form-group">
      <p className="mt-2">Email</p>
      <input type="email" placeholder="Email" className="form-control " onChange={frm.handleChange} onBlur={frm.handleBlur}/>
      <p className='text text-danger'>{frm.errors.email}</p>
    </div>
    <div className="form-group">
      <p className="mt-2">Password</p>
      <input type="password" placeholder="Password" className="form-control " onChange={frm.handleChange} onBlur={frm.handleBlur}/>
      <p className='text text-danger'>{frm.errors.password}</p>

    </div>
    <div className="form-group text-center">
      <button className="btn btn-success mt-2 " >Login</button>
    </div>
  </form>;
};

export default Login;
