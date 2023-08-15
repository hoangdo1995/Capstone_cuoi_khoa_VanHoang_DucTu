import React,{useState, useEffect} from "react";

type Props = {
    component:JSX.Element,
    mobileComponent?:JSX.Element
};

type Screen = {
    width:number,
    height:number
}

const ResponsiveItem = (props: Props) => {
    let componentRender = props.component;
    let [screen,setScreen] = useState({
        width:window.innerWidth,
        height:window.innerHeight
    });
    const getScreen = ()=>{
        const screen:Screen = {
            width: window.innerWidth,
            height:window.innerHeight
        }
        setScreen(screen);
    }
    useEffect(()=>{
        window.addEventListener('load',getScreen);
        window.addEventListener('resize',getScreen);
        return ()=>{
            window.removeEventListener('load',getScreen);
            window.removeEventListener('resize',getScreen);
        }   
    },[screen]);

    if(screen.width < 768 && props.mobileComponent){
        componentRender =  props.mobileComponent
    }

    return <>
        {componentRender}
    </>

};

export default ResponsiveItem;
