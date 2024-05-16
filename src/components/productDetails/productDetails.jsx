import axios from 'axios';
import React, { useContext } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';


export default function ProductDetails() {
  let { AddToCard } = useContext(cartContext);

  async function addToCart(id) {
    let { data } = await AddToCard(id);
    if (data.status === 'success') {
      toast.success(data.message)
    } else {
      toast.error('An error occurred. Please try again.')
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let params = useParams();

  async function getProudctDetails(id) {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let { data, isLoading } = useQuery('details', () => getProudctDetails(params.id));

  // console.log(data?.data.data);
  return (
    <div>
      {
        isLoading ? <div className='vh-100 d-flex justify-content-center align-items-center'>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
          :
          <>
            <div className="row align-items-center my-5">
              <div className="col-md-3">
                <Slider {...settings}>
                  {
                    data?.data.data.images.map(img => { return <img src={img} key={img} alt={data?.data.title} className='w-100' /> }
                    )
                  }
                </Slider>
              </div>
              <div className="col-md-9">
                <h2>{data?.data.data.title}</h2>
                <p className='text-muted'>{data?.data.data.description}</p>
                <p className='text-main'>{data?.data.data.category.name}</p>
                <div className='d-flex justify-content-between py-3'>
                  <span>{data?.data.data.price}EGP</span>
                  <span><i className='fa-solid fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
                </div>
                <button className='btn bg-main text-light w-100' onClick={() => addToCart(data?.data.data._id)}>Add</button>
              </div>
            </div>
          </>
      }
    </div>
  )
}
