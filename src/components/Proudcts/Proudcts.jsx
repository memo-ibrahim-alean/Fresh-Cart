import axios from 'axios'
import { useContext } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';

export default function Proudcts() {
  // const [products, setProducts] = useState([]);
  // async function getProducts() {
  //   let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //   console.log(data);
  //   setProducts(data.data);
  // }

  // useEffect(() => {
  //   getProducts();
  // }, [])

  let { AddToCard } = useContext(cartContext);

  async function addToCart(id) {
    let { data } = await AddToCard(id);
    if (data.status === 'success') {
      toast.success(data.message)
    } else {
      toast.error('An error occurred. Please try again.')
    }
  }
  async function getProducts() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { data, isLoading } = useQuery('products', getProducts);

  return (

    <div className='row'>
      {/* this is use query */}
      {!isLoading ? data?.data.data.map((product) => {
        return (
          <div className='col-md-3' key={product._id}>
            <div className="product p-5 text-center">
              <Link to={`/details/${product._id}`}>
                <img src={product.imageCover} alt={product.title} className='w-100' />
                <p className='text-main mt-2'>{product.category.name}</p>
                <h6 className='text-muted'>{product.title.split(' ').slice(0, 2).join(' ')}</h6>
                <div className='d-flex justify-content-between py-3'>
                  <span>{product.price}EGP</span>
                  <span><i className='fa-solid fa-star rating-color'></i>{product.ratingsAverage}</span>
                </div>
              </Link>
              <button className='btn bg-main text-light w-100' onClick={() => addToCart(product._id)}>Add</button>
            </div>

          </div>
        )
      }) :
        <div className='vh-100 d-flex justify-content-center align-items-center'>
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
        </div>}
      {/* this is with use effect */}
      {/* {products.length > 0 ? products.map((product) => {
        return (
          <div className='col-md-3'>
            <div className=" product p-5 text-center">
              <img src={product.imageCover} alt={product.title} className='w-100' />
              <p className='text-main mt-2'>{product.category.name}</p>
              <h6 className='text-muted'>{product.title.split(' ').slice(0, 2).join(' ')}</h6>
              <div className='d-flex justify-content-between py-3'>
                <span>{product.price}EGP</span>
                <span><i className='fa-solid fa-star rating-color'></i>{product.ratingsAverage}</span>
              </div>
              <button className='btn bg-main text-light w-100'>Add</button>
            </div>
          </div>
        )
      }) :
        <div className='vh-100 d-flex justify-content-center align-items-center'>
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
        </div>} */}
    </div>
  )
}
