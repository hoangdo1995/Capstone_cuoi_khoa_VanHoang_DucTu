import React,{useEffect} from "react";

type Props = {};

const Carousel = (props: Props) => {
  useEffect(()=>{
    
  },[]);
  
  return <div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://ik.imagekit.io/tvlk/blog/2022/03/khach-san-view-dep-gia-re-o-sai-gon-6-1024x471.jpg?tr=dpr-2,w-675" className="d-block w-100" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5 style={{top:'40%',right:0,textAlign:'right'}}>Khám phá thế giới qua những cửa sổ mới</h5>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1440/https://vungtau.viashotels.com/wp-content/uploads/2022/05/Rectangle-2772.jpg" className="d-block w-100" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5 style={{right:'0%',textAlign:'right'}}>Chìm đắm trong sóng biển, tận hưởng nhà ở cùng Airbnb</h5>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://ik.imagekit.io/tvlk/blog/2022/08/khach-san-co-ho-boi-vo-cuc-o-sai-gon-10-1024x607.jpg?tr=dpr-2,w-https://ik.imagekit.io/tvlk/blog/2022/03/khach-san-view-dep-gia-re-o-sai-gon-6-1024x471.jpg?tr=dpr-2,w-675" className="d-block w-100" alt="..." />
      <div className="carousel-caption d-none d-md-block">
        <h5 style={{right:'0%',textAlign:'right',top:'20%'}}>Khám phá thành phố qua mắt <span style={{fontSize:'40px',color:"yellow"}} className="">Airbnb</span> - Nhà của bạn ở khắp mọi nơi</h5>
      </div>
    </div>
  </div>

</div>
;
};

export default Carousel;
