import React from "react";
import { LocationType } from "../Modal/UtilModel";

type Props = {
    content?:LocationType,
};

const CardPosition = (props: Props) => {
  return <div className="card-item d-flex align-items-center m-2" onClick={()=>{
    
    }}>
            <div className="image">
                <img src={props.content?.hinhAnh} alt="..." className="" />
            </div>
            <div className="information">
                <p className="name">{props.content?.tenViTri}</p>
                <p className="distance">{props.content?.tinhThanh}</p>
            </div>
</div>;
};

export default CardPosition;
