import React,{useEffect, useState} from "react";
import Carousel from "../../components/Carousel/Carousel";
import CardPosition from "../../components/CardPosition/CardPosition";
import { httpNonAuth } from "../../util/config";
import { LocationType } from "../../components/Modal/UtilModel";

type Props = {};

const HomePage = (props: Props) => {
  const [listLocation,setListLocation] = useState<LocationType[]>();


  const getListLocation = async()=>{
    const res = await httpNonAuth('/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8');
    console.log(res.data.content.data);
    setListLocation(res.data.content.data);
  }
  useEffect(()=>{
      getListLocation();
     
  },[])
  return <div className="container homePage">
      <div className="carousel d-block">
        <Carousel/>
      </div>
      <div className="recent_position row px-5 py-3 ">
        {listLocation?.map((location,index)=> <div className="content col-3 p-0" key={index}>
            <CardPosition content={location} />
        </div>)}
      </div>
      <div className="category-position">
        <h3>Ở bất cứ đâu</h3>
        <div className="category">
              <div className="content d-flex row">
                <div className="item col-3">
                  <div className="item-content">
                    <div className="image">
                        <img src="./images/batcudau.jpg" alt="..." />
                    </div>
                    <h4>Toàn bộ nhà</h4>
                  </div>
                </div>
                <div className="item col-3">
                  <div className="item-content">
                    <div className="image">
                        <img src="./images/nhatrenthuyen.jpg" alt="..." />
                    </div>
                    <h4>Chổ ở độc đáo</h4>
                  </div>
                </div>
                <div className="item col-3">
                  <div className="item-content">
                    <div className="image">
                        <img src="./images/nhatrangtrai.jpg" alt="..." />
                    </div>
                    <h4>Trang trại và thiên nhiên</h4>
                  </div>
                </div>
                <div className="item col-3">
                  <div className="item-content">
                    <div className="image">
                        <img src="./images/voithucung.jpg" alt="..." />
                    </div>
                    <h4>Cho phép mang theo thú cưng</h4>
                  </div>
                </div>
              </div>  
          </div>
      </div>
  </div>;
};

export default HomePage;
