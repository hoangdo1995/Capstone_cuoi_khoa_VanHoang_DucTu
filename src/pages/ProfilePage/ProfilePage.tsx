import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { profileAsyncApi } from '../../redux/UserReducer/UserReducer'
import { PASSWORD_REGEX, PHONE_VN_REGEX } from "../../util/config";
import '../../scss/components/profile.scss'

type Props = {}

export default function ProfilePage({ }: Props) {
  const frmUserProfile = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('email không được bỏ trống!!').email('email không hợp lệ'),
      password: yup.string().min(4, 'password phải 4 kí tự ').required('password không được bỏ trống!!').matches(PASSWORD_REGEX, "Password sai định dạng!"),
      phone: yup
        .string()
        .required("Phone không được để trống!")
        .matches(PHONE_VN_REGEX, "Phone sai định dạng!"),
      gender: yup.boolean(),

    }),
    onSubmit: (value: any) => {

    }
  })
  const { userProfile } = useSelector((state: RootState) => state.UserReducer);
  const dispatch: DispatchType = useDispatch();



  useEffect(() => {
    //call api get profile
    const actionThunk = profileAsyncApi();
    dispatch(actionThunk);


  }, []);


  return (
    <div className="container">
      <h3>Profile</h3>
      {/* <div className="row">
        <div className="col-4">
          <img src='https://i.pravatar.cc' alt="..." className="rounded-circle" width={200} height={200} />
        </div>
        <div className="col-8">
          <form>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <p>email</p>
                  <i className="fa fa-envelope" />
                  <input type="email" name="email" className="form-control" value={userProfile?.email}   onChange={frmUserFrofile.handleChange}/>
                </div>
                <div className="form-group">
                  <p>Phone</p>
                  <input name="phone" className="form-control"value={userProfile?.phone}   onChange={frmUserFrofile.handleChange} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Name</p>
                  <input type="name" name="name" className="form-control" value={userProfile?.name}   onChange={frmUserFrofile.handleChange} />
                </div>
                <div className="form-group">
                  <p>password</p>
                  <input name="password" type='password' className="form-control" value={userProfile?.password}   onChange={frmUserFrofile.handleChange} />
                </div>
              </div>

              <div className="form-group d-flex">
                <div className="w-75">
                  <p>Gender</p>
                  <input name="gender" type='radio' /> Male
                  <input name="gender" type='radio' />Female
                </div>
                <div className="text-right w-25 mt-3">
                  <button className="btn btn-primary" type="submit"> Update</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div> */}
      <form onSubmit={frmUserProfile.handleSubmit}>
        <div className="row">
          <div className="col-lg-4  avatar">
            <div className="card mb-4" >
              <div className="card-body text-center">
                {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              className="rounded-circle img-fluid"> */}
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" width={300} className='rounded-circle img-fluid' />
                <span className="my-3">
                  <input type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur}    />
                </span>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
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
                {/* <p className="text-muted mb-0">Johnatan Smith</p> */}
                <div className="input-box form-group">
                  <span className="icon"><i className="fa fa-user" /></span>
                  <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 mt-5 fill"> Phone</p>
              </div>
              <div className="col-sm-9">
                {/* <p className="text-muted mb-0">Johnatan Smith</p> */}
                <div className="input-box form-group">
                  <span className="icon"><i className="fa fa-phone" /></span>
                  <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 mt-5 fill">Email</p>
              </div>
              <div className="col-sm-9">
                {/* <p className="text-muted mb-0">Johnatan Smith</p> */}
                <div className="input-box form-group">
                  <span className="icon"><i className="fa fa-envelope" /></span>
                  <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0 mt-5 fill">Password</p>
              </div>
              <div className="col-sm-9">
                {/* <p className="text-muted mb-0">Johnatan Smith</p> */}
                <div className="input-box form-group">
                  <span className="icon"><i className="fa fa-lock" /></span>
                  <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-6 item2">
            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-user" /></span>
              <input className="form-control" type="text" name="username" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} />
              <label> Username</label>

            </div>
            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-lock" /></span>
              <input className="form-control" type="password" name="password" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} />
              <label> Password</label>

            </div>

            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-envelope" /></span>
              <input className="form-control" type="email" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} name="email" />
              <label> Email</label>

            </div>
            <div className="input-box form-group">
              <span className="icon"><i className="fa fa-phone" /></span>
              <input className="form-control" type="text" onChange={frmUserProfile.handleChange} onBlur={frmUserProfile.handleBlur} name="phone" />
              <label> Phone</label>

            </div>
            <div className="remember-forgot check form-group mt-5">
              <input name="gender" type='radio' onChange={frmUserProfile.handleChange} style={{ marginLeft: 300 }} /> Male
              <input name="gender" type='radio' onChange={frmUserProfile.handleChange} />Female
            </div>
            <div>
              <button className=' btn btn-primary w-25'>
                Update
              </button>
            </div>
          </div> */}
        </div>

      </form>

    </div>
  )
}
