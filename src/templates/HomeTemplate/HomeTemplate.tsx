import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ModalContainer from "../../hoc/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { setModalStateReducer } from "../../redux/reducers/ModalReducer";

type Props = {};

const HomeTemplate = (props: Props) => {
  const dispatch:DispatchType = useDispatch();
  const { component,state } = useSelector((state:RootState) => state.ModalReducer);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (state:boolean) => {
    setIsModalOpen(state);
    const action = setModalStateReducer(state);
    dispatch(action);
  };
  useEffect(()=>{
    // setIsModalOpen(state);
  },[state])
  return <div className="">
    <header className="border-bottom">
      <Header modalStateHandle={toggleModal}/>
    </header>
    <div className="body">
      <Outlet/>
    </div>
    <footer>
      <Footer/>
    </footer>
    {state&&<ModalContainer/>}
    

  </div>;
};

export default HomeTemplate;
