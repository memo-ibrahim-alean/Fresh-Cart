import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userToken';

export default function Login() {
  let { setToken } = useContext(userContext);
  const [errMessage, setErr] = useState(null);
  let [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();

  const schemaValidation = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, `Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), one special character (@$!%*?&), and be at least 8 characters long..
`),})
  async function signIn(values) {
    setLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
      setErr(err.response.data.message);
      setLoading(false);
    })

    if (data.message === 'success') {
      setLoading(false);
      setErr(null);
      formik.resetForm();
      navigate('/');
      localStorage.setItem('userToken', data.token);
      setToken(localStorage.getItem('userToken'));
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schemaValidation,
    onSubmit: signIn
  })

  return (
    <div className='container w-75 mx-auto my-5'>
      <h2 className='text-main fw-bold mb-3'>Login Form</h2>
      {errMessage && <p className='alert alert-danger'>{errMessage}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="email">Email</label>
          <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id='email' className='form-control' />
          {(formik.errors.email && formik.touched.email) && <div className='alert alert-danger'>{formik.errors.email}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" id='password' className='form-control' />
          {(formik.errors.password && formik.touched.password) && <div className='alert alert-danger'>{formik.errors.password}</div>}
        </div>
        {
          isLoading ? <button className='btn bg-main text-light d-block ms-auto'><i className='fa-solid fa-spinner fa-spin'></i></button> :
            <>
              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light float-end'>Login</button>
              <Link to="/forgetPassword">
                <span className='text-main'>forget password? Reset it now.</span>
              </Link>
              <br />
              <Link to="/register">
                <span className='text-main'>New user? Register now.</span>
              </Link>

            </>
        }
      </form>
    </div>
  )
}
