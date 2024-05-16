import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function Categories() {
  var settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  async function getCategories() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/`)
  }

  let { data } = useQuery('categories', getCategories);

  return (
    <>
      <Slider {...settings}>
        {
          data?.data.data.map(cat =>
            <img src={cat.image} key={cat._id} alt={cat.name} height={200} />
          )
        }
      </Slider>
    </>
  )
}
