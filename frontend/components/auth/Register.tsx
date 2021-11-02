import React, { useEffect, useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Button from '../layout/Button';
import { Toast } from '../../utils/messages';
import axios from 'axios';
import requests from '../../utils/requests';
import { useAppSelector } from '../../redux/store';
import { formikSetError } from '../../utils/setError';


interface initialValuesInterface {
  username: string,
  email: string,
  password: string,
  confirm_password: string
};


const Register: React.FC = () => {

  const router = useRouter();

  const auth = useAppSelector(state => state.auth);

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const initialValues: initialValuesInterface = useMemo(() => {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  }, []);

  useEffect(() => {
    auth.isAuthenticated && router.push('/')
  }, [auth.isAuthenticated, router])

  return (
    <div className="container mt-4 mx-auto">
      <div className="md:px-20 md:mx-20">
        <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          username: Yup.string()
          .required('This field may not be blank!')
          .max(150, "The characters can't be more than 150!"),
          email: Yup.string()
          .email('Enter a valid email address!')
          .required('This field may not be blank!'),
          password: Yup.string()
          .required('This field may not be blank!')
          .min(8, 'Password at least must be 8 characters!'),
          confirm_password: Yup.string()
          .required('This field may not be blank!')
          .oneOf([Yup.ref('password'), null], 'Passwords not match!')
        })}
        onSubmit={
          (values, {setFieldError}) => {
            const postData = async () => {
              try {
                setRegisterLoading(true);
                await axios.post(requests.register, values);
                Toast.fire({
                  title: 'Register success!',
                  text: 'Redirecting to login page...',
                  icon: 'success',
                  timer: 2000
                }).then(() => {
                  router.push('/login');
                });
              } catch (e: any) {
                const { response } = e;
                if (response.status === 400) {
                  formikSetError(response, setFieldError);
                } else {
                  Toast.fire({
                    title: 'Register faild!',
                    text: 'Something went wrong, please try again!',
                    icon: 'error',
                    timer: 2000
                  });
                }
              } finally {
                setRegisterLoading(false);
              }
            };
            postData();
          }
        }
        >
          {({
            values,
            errors,
            handleChange, 
            handleSubmit,
            handleBlur,
            touched
          }) => (
            <form method="POST" onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        value={values.username}
                        name="username"
                        id="username"
                        className="form-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {
                      touched.username
                      &&
                      errors.username 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.username}
                      </div> 
                      }
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        value={values.email}
                        name="email"
                        id="email"
                        className="form-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {
                      touched.email
                      &&
                      errors.email 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.email}
                      </div> 
                      }
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        value={values.password}
                        name="password"
                        id="password"
                        className="form-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {
                      touched.password
                      &&
                      errors.password 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.password}
                      </div> 
                      }
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="confirm_password" className="form-label">
                        Re-enter password
                      </label>
                      <input
                        type="password"
                        value={values.confirm_password}
                        name="confirm_password"
                        id="confirm_password"
                        className="form-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {
                      touched.confirm_password
                      &&
                      errors.confirm_password 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.confirm_password}
                      </div> 
                      }
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button
                  className="btn btn-green-outline"
                  text="Register"
                  type="submit"
                  loading={registerLoading}
                  />
                </div>
              </div>
            </form>
        )}
        </Formik>
      </div>
    </div>
  )
}

export default Register;