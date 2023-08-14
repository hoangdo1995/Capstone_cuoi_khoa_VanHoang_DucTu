import React, { useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
type Props={
  setPageNumberState:(pageNumber:number)=>void;
  totalItem:number
}
const PaginationComponent = (props:Props) => {

  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
      props.setPageNumberState(page);
      setCurrent(page);
  };

  return <Pagination current={current}  onChange={onChange} total={props.totalItem} pageSize={6}/>;
};

export default PaginationComponent;
