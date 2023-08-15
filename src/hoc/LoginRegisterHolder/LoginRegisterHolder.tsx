import React from "react";

type Props = {
    component:JSX.Element;
};

const LoginRegisterHolder = (props: Props) => {

  return <div style={{backgroundImage:'url(https://mcdn.wallpapersafari.com/medium/94/24/IlC3kr.jpg)',backgroundSize:'cover',backgroundPosition:'center',height:'100vh'}}>
        <div className="w-50">
            <img src="" alt="" />
        </div>
        <div className="w-50 p-5" style={{backdropFilter:"blur(5px)"}}>
            {props.component}
        </div> 
  </div>;
};

export default LoginRegisterHolder;
