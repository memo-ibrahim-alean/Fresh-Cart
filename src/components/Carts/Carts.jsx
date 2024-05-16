import React, { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import { cartContext } from '../../context/cartContext';
import { Link } from 'react-router-dom';
import emptyCartImg from '../../assets/images/empty-cart.png';

export default function Carts() {
  const [details, setDetails] = useState('');
  const [cartDetails, setCart] = useState([]);
  let { getLoggedUserCart, removeItem, updateCountItem } = useContext(cartContext);

  async function getCartItems() {
    let { data } = await getLoggedUserCart();
    setDetails(data?.data);
    setCart(data?.data.products);
  }
  // const getCartItems = useCallback(async () => {
  //   let { data } = await getLoggedUserCart();
  //   setDetails(data?.data);
  //   setCart(data?.data.products);
  // }, [getLoggedUserCart]);

  useEffect(() => {
    getCartItems(); // Call it here
  }, []);

  async function updateCartItems(id, count) {
    let { data } = await updateCountItem(id, count);
    setDetails(data?.data);
    setCart(data.data.products);
  }

  async function deltetItem(id) {
    let { data } = await removeItem(id);
    setDetails(data?.data);
    setCart(data.data.products);
  }


  // useEffect(() => {
  //   getCartItems();
  // }, [getCartItems]);
  return (
    <div className='bg-main-light my-5 p-5'>
      {
        cartDetails.length !== 0 ?
          <div>
            <h2>Shop Cart</h2>
            <h5 className='text-main'>Total Price : {details.totalCartPrice}</h5>
          </div> : null
      }

      {/* <div className='text-end my-2'>
        <button className='btn btn-outline-danger'>Clear All Cart</button>
      </div> */}
      {

        cartDetails.length === 0 ? <div className='text-center'>
          <img src={emptyCartImg} alt='empty cart' />
        </div>
          :
          cartDetails.map(product => {
            return (
              <>
                {product.count !== 0 ? <div className='row my-3 border-bottom py-3' key={product._id}>
                  <div className="col-md-1">
                    <img src={product?.product.imageCover} alt={product.title} className='w-100' />
                  </div>
                  <div className="col-md-11 d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{product.product.title.split(' ').slice(0, 2).join(' ')}</h6>
                      <p className='text-main'>{product.product.category.name}</p>
                      <p> Price: {product.price * product.count} EGP</p>
                      <button onClick={() => deltetItem(product.product._id)} className='btn btn-outline-danger'><i className='fa-regular fa-trash-can mx-2'></i> Remove</button>
                    </div>
                    <div>
                      <button onClick={() => updateCartItems(product.product._id, product.count + 1)} className='btn btn-outline-success'>+</button>
                      <span className='mx-2'>{product.count}</span>
                      <button onClick={() => updateCartItems(product.product._id, product.count - 1)} className='btn btn-outline-success'>-</button>
                    </div>
                  </div>
                </div> : null}

              </>

            )
          })
      }

      {
        cartDetails.length !== 0 ? <Link to={'/checkout'}>
          <button className='btn bg-main text-light my-3'>Proceed to Checkout</button>
        </Link>
        : null
      }

    </div>
  )
}
