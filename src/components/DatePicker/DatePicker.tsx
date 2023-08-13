import React,{useEffect } from 'react';
import { DatePicker, Space} from 'antd';
import { RangeValue } from 'rc-picker/lib/interface';
import dayjs,{Dayjs}  from 'dayjs';
import { DaySelectType } from '../Modal/UtilModel';

const { RangePicker } = DatePicker;
type Props = {
  onStateChange:(newState:DaySelectType|null)=>void;
}

const DatePickerComponent = (props:Props) => {
  const currentDay = dayjs();
  const handleChangeState = (newState: DaySelectType|null) => {
    props.onStateChange(newState); // Gọi callback function để gửi giá trị lên cha
  };

  const handleDateChange = (values: RangeValue<Dayjs>,formatString: [string, string]) => {
      if(values){
        const rangeDay = values[1]?.diff(values[0],'day');
        const daySelect: DaySelectType = {
          startDay:values[0]?.format('YYYY-MM-DDTHH:mm:ss'),
          endDay:values[1]?.format('YYYY-MM-DDTHH:mm:ss'),
          rangeDay:rangeDay
        }
        console.log(daySelect);
        
        handleChangeState(daySelect);
      }  
  };
  useEffect(()=>{

  },[])
  return <Space direction="vertical" size={12}>
    <RangePicker onChange={handleDateChange} defaultValue={[currentDay,currentDay]}
      cellRender={(current, info) => {
        if (info.type !== 'date') return info.originNode;
        const style: React.CSSProperties = {};
        if (current.date() === 1) {
          style.border = '1px solid #1677ff';
          style.borderRadius = '50%';
        }
        return (
          <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
  </Space>
};

export default DatePickerComponent;