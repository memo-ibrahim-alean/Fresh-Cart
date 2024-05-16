import React from 'react';
import Slider from "react-slick";
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import img4 from '../../assets/images/grocery-banner-2.jpeg'
import img5 from '../../assets/images/grocery-banner.png'

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
  return (
    <div className='row my-5 gx-0'>
      <div className="col-md-9">
        <Slider {...settings}>
          <img src={img1} alt='img1' height={400} className='w-100' />
          <img src={img2} alt='img2' height={400} className='w-100' />
          <img src={img3} alt='img3' height={400} className='w-100' />
        </Slider>
      </div>
      <div className="col-md-2">
        <img src={img4} alt='img4' height={200} className='w-100' />
        <img src={img5} alt='img5' height={200} className='w-100' />
      </div>
    </div>
  )
}
