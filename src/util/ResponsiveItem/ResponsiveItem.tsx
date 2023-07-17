import React,{useState} from "react";

type Props = {
    component:React.FC,
    mobileComponent:React.FC
};

type screen = {
    width:number,
    height:number
}

const ResponsiveItem = (props: Props) => {

    let [screen,setScreen] = useState({
        width:window.innerWidth,
        height:window.innerHeight
    });
    console.log(screen);
  return <div></div>;
};

export default ResponsiveItem;
