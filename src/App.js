import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Proudcts from './components/Proudcts/Proudcts';
import Carts from './components/Carts/Carts';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import Categories from './components/Categories/Categories';
import { useContext, useEffect } from 'react';
import { userContext } from './context/userToken';
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter';
import ProductDetails from './components/productDetails/productDetails';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/checkOut/checkOut';
import Allorders from './components/allorders/allorders';

export default function App() {
  let { setToken } = useContext(userContext);
  const Router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        {
          path: '', element:
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
        },
        {
          path: 'home', element:
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
        },
        {
          path: 'proudcts', element:
            <ProtectedRouter>
              <Proudcts />
            </ProtectedRouter>
        },
        {
          path: 'forgetPassword', element:
            <ForgetPassword />
        },
        {
          path: 'resetPassword', element:
            <ResetPassword />
        },
        {
          path: 'details/:id', element:
            <ProtectedRouter>
              <ProductDetails />
            </ProtectedRouter>
        },
        {
          path: 'carts', element:
            <ProtectedRouter>
              <Carts />
            </ProtectedRouter>
        },
        {
          path: 'checkout', element:
            <ProtectedRouter>
              <CheckOut />
            </ProtectedRouter>
        },
        {
          path: 'allorders', element:
            <ProtectedRouter>
              <Allorders />
            </ProtectedRouter>
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {
          path: 'categories', element:
            <ProtectedRouter>
              <Categories />
            </ProtectedRouter>
        },
        {
          path: 'brands', element:
            <ProtectedRouter>
              <Brands />
            </ProtectedRouter>
        },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'));
    }
  }, [setToken])

  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
      <Toaster />
    </>
  );
}
