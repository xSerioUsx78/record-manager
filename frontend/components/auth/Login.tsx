import React, { useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Button from '../layout/Button';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginUser } from '../../redux/slice/auth';


interface initialValuesInterface {
  username: string,
  password: string
};


const Login: React.FC = () => {

  const router = useRouter();

  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const initialValues: initialValuesInterface = useMemo(() => {
    return {
      username: '',
      password: '',
    }
  }, []);

  useEffect(() => {
    auth.isAuthenticated && router.push('/');
  }, [auth.isAuthenticated, router]);

  return (
    <div className="container mt-4 mx-auto">
      <div className="md:px-20 md:mx-20">
        <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          username: Yup.string()
          .required('This field may not be blank!')
          .max(150, "The characters can't be more than 150!"),
          password: Yup.string()
          .required('This field may not be blank!')
        })}
        onSubmit={
          async (values) => {
            dispatch(loginUser(values));
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
                    <div className="col-span-6">
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
                    <div className="col-span-6">
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
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button
                  className="btn btn-green-outline"
                  text="Login"
                  type="submit"
                  loading={auth.isLoading}
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

export default Login;