import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {
  const [errorMessage, setErrorMessage] = useState('');

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
  })

  async function sendCode(values) {
    formik.resetForm();
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);

      if (data.statusMsg === 'success') {
        document.querySelector('.forgetPassword').classList.add('d-none');
        document.querySelector('.verifyCode').classList.remove('d-none');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Email not found. Please enter a valid email.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  }

  let formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: sendCode
  })

  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required('Code is required')
  })

  let navigate = useNavigate();
  async function sendData(values) {
    formik.resetForm();
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
    if (data.status === 'Success') {
      navigate('/ResetPassword');
    }
  }

  let verifyFormik = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: validationSchema2,
    onSubmit: sendData
  })

  return (
    <>
      <div className='forgetPassword'>
        <h3 className='mt-3 text-center'>Forget Password</h3>
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>
          <label htmlFor="email">Email</label>
          <input type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name='email' className='form-control' />
          {
            formik.touched.email && formik.errors.email ? <div className='my-3 alert alert-danger'>{formik.errors.email}</div> : null
          }
          {errorMessage && <div className='my-3 alert alert-danger'>{errorMessage}</div>}
          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light my-3'>Send Code</button>
        </form>
      </div>
      <div className='verifyCode d-none'>
        <h3 className='mt-3 text-center'>Verify Code</h3>
        <form onSubmit={verifyFormik.handleSubmit} className='w-75 mx-auto my-5'>
          <label htmlFor="resetCode">Reset Code</label>
          <input type="text" value={verifyFormik.values.resetCode} onBlur={verifyFormik.handleBlur} onChange={verifyFormik.handleChange} id='resetCode' name='resetCode' className='form-control' />
          {
            verifyFormik.touched.resetCode && verifyFormik.errors.resetCode ? <div className='my-3 alert alert-danger'>{verifyFormik.errors.resetCode}</div> : null
          }
          <button disabled={!(verifyFormik.isValid && verifyFormik.dirty)} type='submit' className='btn bg-main text-light my-3'>Verify Code</button>
        </form>
      </div>
    </>
  )
}
