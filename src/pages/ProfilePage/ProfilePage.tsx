import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { UserType, profileAsyncApi } from '../../redux/UserReducer/UserReducer'
import { http, httpNonAuth } from '../../util/config'
import { PASSWORD_REGEX, PHONE_VN_REGEX } from "../../util/config";
import '../../scss/components/profile.scss'

type Props = {}

const ProfilePage = (props: Props)=>{
  const dispatch:DispatchType = useDispatch();
  const {userProfile} = useSelector((state:RootState)=>state.UserReducer);
  const {userLogin} = useSelector((state:RootState)=>state.UserReducer);
  
  const frmUserProfile = useFormik<UserType|any>({
    initialValues: userProfile,
    validationSchema: yup.object().shape({
      email: yup.string().required('email không được bỏ trống!!').email('email không hợp lệ'),
      password: yup.string().min(4, 'password phải 4 kí tự ').required('password không được bỏ trống!!').matches(PASSWORD_REGEX, "Password sai định dạng!"),
      phone: yup
        .string()
        .required("Phone không được để trống!")
        .matches(PHONE_VN_REGEX, "Phone sai định dạng!"),
      gender: yup.boolean(),
    }),
    onSubmit: async(values:any) => {  
    }
  })
  
  const getProfile =()=>{
    console.log('userLogin',userLogin);
    
    const actionThunk =  profileAsyncApi(userLogin?.user.id);
    dispatch(actionThunk);
  }


  useEffect(()=>{
  
    getProfile();

  }, []);


  return (
    <div className="container">
      <h3>Profile</h3>
      <form onSubmit={frmUserProfile.handleSubmit}>
        <div className="row">
          <div className="col-lg-4  avatar">
            <div className="card mb-4" >
              <div className="card-body text-center">
                <img src={`https://i.pravatar.cc?u=${userProfile?.avatar}`} alt="avatar" width={300} className='rounded-circle img-fluid' />
                <span className="my-3">
                  <input type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} value={userProfile?.name} className='my-3 text-center border-0 fs-3 fw-semibold'/>
                </span>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">Follow</button>
                  <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 item1">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 mt-5 fill">Full Name</p>
              </div>
              <div className="col-sm-9">
                <div className="input-box form-group">
                  <span className="icon"><i className="fa fa-user" /></span>
                  <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} defaultValue={userProfile?.name}/>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 mt-5 fill"> Phone</p>
              </div>
              <div className="col-sm-9">
                <div className="input-box form-group">
                  <span className="icon"><i className="fa fa-phone" /></span>
                  <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} defaultValue={userProfile?.phone}/>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 mt-5 fill">Email</p>
              </div>
              <div className="col-sm-9">
                <div className="input-box form-group">
                  <span className="icon"><i className="fa fa-envelope" /></span>
                  <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} defaultValue={userProfile?.email}/>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 mt-5 fill">Password</p>
              </div>
              <div className="col-sm-9">
                <div className="input-box form-group">
                  <span className="icon"><i className="fa fa-lock" /></span>
                  <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} defaultValue={userProfile?.password}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage;
