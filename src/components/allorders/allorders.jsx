import React from 'react'
import successPaymentImg from '../../assets/images/Paymentsuccessful21.png';
import { Link } from 'react-router-dom';

export default function Allorders() {
  return (
    <>
      <div className='text-center mt-5'>
        <img src={successPaymentImg} alt='success payment' />
        <br />
        <Link to='/'><button className='btn bg-main text-light my-3'>Back to Home</button></Link>
      </div >
    </>

  )
}
