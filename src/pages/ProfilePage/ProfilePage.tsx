import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { profileAsyncApi } from '../../redux/UserReducer/UserReducer'

type Props = {}

export default function ProfilePage({ }: Props) {
const frmUserFrofile = useFormik({
  initialValues:{},
  onSubmit:(value:any)=>{

  }
})
  const {userProfile} = useSelector((state:RootState)=>state.UserReducer);
  const dispatch:DispatchType = useDispatch();



  useEffect(()=>{
//call api get profile
  const actionThunk= profileAsyncApi();
  dispatch(actionThunk);


  },[]);


  return (
    <div className="container">
      <h3>Profile</h3>
      <div className="row">
        <div className="col-4">
          <img src='https://i.pravatar.cc' alt="..." className="rounded-circle" width={200} height={200} />
        </div>
        <div className="col-8">
          <form>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <p>email</p>
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
      </div>
    </div>
  )
}
