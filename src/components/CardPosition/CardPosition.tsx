import React from "react";
import { LocationType } from "../Modal/UtilModel";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../redux/store";
import { setPositionSearch } from "../../redux/reducers/PositionSearchReducer";
import { history } from "../..";

type Props = {
    content?:LocationType,
};

const CardPosition = (props: Props) => {
    const dispatch:DispatchType =  useDispatch();
    return <div className="card-item d-flex align-items-center m-2" onClick={()=>{
        const action = setPositionSearch({name:props.content?.tenViTri,id:props.content?.id});
        dispatch(action);
        history.push('list-room');
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
