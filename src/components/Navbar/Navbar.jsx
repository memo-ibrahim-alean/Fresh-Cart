import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { userContext } from '../../context/userToken';
export default function Navbar() {
  let { userToken, setToken } = useContext(userContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" className='w-100 img-fluid' />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="carts">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="proudcts">Proudcts</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="brands">Brands</Link>
            </li> */}
          </ul> : null}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            {
              userToken === null ?
                <>
                  <li className="nav-item">
                    <i className='fab mx-2 fa-facebook'></i>
                    <i className='fab mx-2 fa-instagram'></i>
                    <i className='fab mx-2 fa-twitter'></i>
                    <i className='fab mx-2 fa-tiktok'></i>
                    <i className='fab mx-2 fa-linkedin'></i>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="register">Register</Link>
                  </li>
                </> :
                <>
                  <li className="nav-item">
                    <i className='fab mx-2 fa-facebook'></i>
                    <i className='fab mx-2 fa-instagram'></i>
                    <i className='fab mx-2 fa-twitter'></i>
                    <i className='fab mx-2 fa-tiktok'></i>
                    <i className='fab mx-2 fa-linkedin'></i>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={() => {logOut()}} aria-current="page" to="login">Logout</Link>
                  </li>
                </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}
