import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ModalContainer from "../../hoc/ModalContainer";
import Demo from "../../components/PositionSelect/Demo";

type Props = {};

const HomeTemplate = (props: Props) => {
  return <div className="">
    <header className="border-bottom">
      <Header/>
    </header>
    <div className="body">
      <Outlet/>
    </div>
    <footer>
      <Footer/>
    </footer>
    <ModalContainer/>
    

  </div>;
};

export default HomeTemplate;
