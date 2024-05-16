import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [errMessage, setErr] = useState(null);
  let [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();

  const schemaValidation = Yup.object({
    name: Yup.string().min(3, 'Min length 3 characters').max(15, 'Max length 15 characters').required('Name is required'),
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/i, 'Enter a valid phone number'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, `Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), one special character (@$!%*?&), and be at least 8 characters long..
`),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'Password does not match')
  })
  async function signUp(values) {
    setLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((err) => {
      setErr(err.response.data.message);
      setLoading(false);
    })

    console.log(data);

    if (data.message === 'success') {
      setLoading(false);
      setErr(null);
      formik.resetForm();
      navigate('/login')
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema: schemaValidation,
    onSubmit: signUp
  })

  return (
    <div className='container w-75 mx-auto my-5'>
      <h2 className='text-main fw-bold mb-3'>Register Form</h2>
      {errMessage && <p className='alert alert-danger'>{errMessage}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="name">Name</label>
          <input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" id='name' className='form-control' />
          {(formik.errors.name && formik.touched.name) && <div className='alert alert-danger'>{formik.errors.name}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor="email">Email</label>
          <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id='email' className='form-control' />
          {(formik.errors.email && formik.touched.email) && <div className='alert alert-danger'>{formik.errors.email}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor="phone">Phone</label>
          <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} type="tel" id='phone' className='form-control' />
          {(formik.errors.phone && formik.touched.phone) && <div className='alert alert-danger'>{formik.errors.phone}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" id='password' className='form-control' />
          {(formik.errors.password && formik.touched.password) && <div className='alert alert-danger'>{formik.errors.password}</div>}
        </div>
        <div className='mb-3'>
          <label htmlFor="rePassword">rePassword</label>
          <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" id='rePassword' className='form-control' />
          {(formik.errors.rePassword && formik.touched.rePassword) && <div className='alert alert-danger'>{formik.errors.rePassword}</div>}
        </div>
        {
          isLoading ? <button className='btn bg-main text-light d-block ms-auto'><i className='fa-solid fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light float-end'>Register</button>
        }
      </form>
    </div>
  )
}
