import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {
  const schemaValidation = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    newPassword: Yup.string().required('newPassword is required').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, `Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), one special character (@$!%*?&), and be at least 8 characters long..
`),
  })

  let navigate = useNavigate();
  async function resetPassword(values) {
    let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
    formik.resetForm();
    if(data.token) {
      navigate('/Login');
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    validationSchema: schemaValidation,
    onSubmit: resetPassword
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='w-75 my-5 m-auto'>
        <label htmlFor="email">Email</label>
        <input type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name='email' className='form-control' />
        {formik.touched.email && formik.errors.email ? <div className='my-3 alert alert-danger'>{formik.errors.email}</div> : null}
        <label htmlFor="newPassword" className='mt-3'>New Password</label>
        <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='newPassword' className='form-control' id='newPassword' />
        {formik.touched.newPassword && formik.errors.newPassword ? <div className='my-3 alert alert-danger'>{formik.errors.newPassword}</div> : null}
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light my-3'>Reset Password</button>
      </form>
    </div>
  )
}
