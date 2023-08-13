import React from "react";
import { CommentType } from "../Modal/UtilModel";
import { Content } from "antd/es/layout/layout";

type Props = {
  content?:CommentType
};

const CommentItem = (props: Props) => {
  return <div className="comment-item col-6">
  <div className="title d-flex">
      <img src={`https://i.pravatar.cc/?u=${props.content?.avatar}`} alt="" />
      <div className="infor">
        <h4>{props.content?.tenNguoiBinhLuan}</h4>
        <div className="comment-date">
          {props.content?.ngayBinhLuan}
        </div>
      </div>
  </div>
  <div className="comment-content">
    {props.content?.noiDung}
  </div>
</div>;
};

export default CommentItem;
