import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import Button from "../layout/Button";
import { CustomSwal } from "../../utils/messages";

interface initialValuesInterface {
  title: string;
  description: string;
}

const Add: React.FC = () => {
  const router = useRouter();

  const initialValues: initialValuesInterface = useMemo(() => {
    return {
      title: "",
      description: "",
    };
  }, []);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  return (
    <div className="container mt-4 mx-auto">
      <div className="md:px-20 md:mx-20">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string()
              .required("This field may not be blank!")
              .max(50, "The characters can't be more than 50!"),
            description: Yup.string().required("This field may not be blank!"),
          })}
          onSubmit={(values) => {
            const postData = async () => {
              try {
                setSubmitLoading(true);
                await axios().post(requests.record, values);
                CustomSwal.fire({
                  title: "Success!",
                  text: "Record created successfully!",
                  icon: "success",
                }).then(() => {
                  router.push("/");
                });
              } catch (e) {
                console.log(e);
              } finally {
                setSubmitLoading(false);
              }
            };
            postData();
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            touched,
          }) => (
            <form method="POST" onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        value={values.title}
                        name="title"
                        id="title"
                        className="form-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.title && errors.title && (
                        <div className="text-red-600 fw-medium mt-2">
                          {errors.title}
                        </div>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        value={values.description}
                        name="description"
                        id="description"
                        className="form-input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.description && errors.description && (
                        <div className="text-red-600 fw-medium mt-2">
                          {errors.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button
                    className="btn btn-green-outline"
                    text="Add record"
                    type="submit"
                    loading={submitLoading}
                  />
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Add;
