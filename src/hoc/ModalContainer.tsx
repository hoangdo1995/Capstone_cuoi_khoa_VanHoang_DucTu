import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
type Props ={

}
const ModalContainer = (props:Props) => {
  const {component} = useSelector((state:RootState) => state.ModalReducer);
  return <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header row py-2 px-0 mx-0">
                      <div className="col-3"></div>
                      <h1 className="modal-title fs-5 col-6" id="staticBackdropLabel">Login or sign up</h1>
                      <button type="button" className="btn-close col-4 mx-2" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                    {component}
                    </div>
                </div>
            </div>
          </div>;
};

export default ModalContainer;
