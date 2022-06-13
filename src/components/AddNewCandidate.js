import React from "react";
import { Formik } from "formik";

import * as Yup from "yup";
// import "./LoginForm.css";
import "../components/AddNewCandidate.css";


function AddNewCandidate({ btnclose, handleNewCandidate, editVal }) {
  const PhoneRegExp = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  const AgeRegExp = /^[0-9]+$/;
  console.log(editVal, "edit");
  // const [initialValues, setinitialValues] = useState( editVal || )
  return (
    <div className="body">
      <Formik
        enableReinitialize
        initialValues={
          editVal
          // name: "",
          //   email: "",
          //   dateofbirth: "",
          //   state: "",
          //   age: "54",
          //   pincode: "",
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log("Logging in", values);
            handleNewCandidate(values, editVal.name ? "edit" : "create");

            resetForm({
              name: "",
              email: "",
              dateofbirth: "",
              state: "",
              age: "",
              pincode: "",
            });
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),

          name: Yup.string()
            .required("Name is required")
            .min(3, "Minimum  3 character"),

          dateofbirth: Yup.string().required("date of required"),

          age: Yup.string()
            .required("Age is required")

            .typeError("That doesn't look like a your age")

            .matches(AgeRegExp, "Must be only digit")
            .min(2, "Must be exactly 2 digits")
            .max(2, "Must be exactly 2 digits"),

          state: Yup.string().required("state is required"),
          pincode: Yup.string()
            .required("pincode is  requird")
            // .min(10000, "Must be Above 6 number"),
            .matches(PhoneRegExp, "Pin-code is not valid"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
          } = props;
          return (
            <div className="container">
              <h1
                style={{
                  textAlign: "left",
                  marginTop: 35,
                  marginLeft: 0,
                  fontSize: 15,
                }}
              >
                Create New candidate
              </h1>
              <form onSubmit={handleSubmit}>
                {" "}
                <div className="user-details">
                  <div className="input-box">
                    <label>Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter your Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name && touched.name && "error"}
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="input-box">
                    <label htmlFor="email">Email address</label>
                    <input
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="input-box">
                    <label>Date of birth</label>
                    <input
                      name="dateofbirth"
                      type="date"
                      placeholder="Enter your Date of birth"
                      value={values.dateofbirth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.dateofbirth && touched.dateofbirth && "error"
                      }
                    />
                    {errors.dateofbirth && touched.dateofbirth && (
                      <div className="input-feedback">{errors.dateofbirth}</div>
                    )}{" "}
                  </div>

                  <div className="input-box1">
                    <label htmlFor="state">State</label>
                    <select
                      name="state"
                      type="text"
                      placeholder="Enter your phone state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      //   maxMenuHeight={20}
                      //   menuPlacement="auto"
                      className={errors.state && touched.state && "error"}
                    >
                      <option value="" label="Select your State">
                        Select your State{" "}
                      </option>
                      <option
                        value="Andhra Pradesh"
                        label="Andhra Pradesh"
                      ></option>
                      <option
                        value="Arunachal Pradesh"
                        label="Arunachal Pradesh"
                      ></option>{" "}
                      <option value="Assam" label="Assam"></option>
                      <option value="Bihar" label="Bihar"></option>
                      <option
                        value="Chhattisgarh"
                        label="Chhattisgarh"
                      ></option>{" "}
                      <option value="Goa" label="Goa"></option>{" "}
                      <option value="Gujarat" label="Gujarat"></option>{" "}
                      <option value="Haryana" label="Haryana"></option>{" "}
                      <option
                        value="Himachal Pradesh"
                        label="Himachal Pradesh"
                      ></option>{" "}
                      <option value="Jharkhand" label="Jharkhand"></option>{" "}
                      <option value="Karnataka" label="Karnataka"></option>{" "}
                      <option value="Kerala" label="Kerala"></option>{" "}
                      <option
                        value="Madhya Pradesh"
                        label="Madhya Pradesh"
                      ></option>{" "}
                      <option value="Maharashtra	" label="Maharashtra	"></option>{" "}
                      <option value="Manipur" label="Manipur"></option>{" "}
                      <option value="Meghalaya" label="Meghalaya"></option>{" "}
                      <option value="Mizoram	" label="Mizoram	"></option>{" "}
                      <option value="Nagaland" label="Nagaland"></option>{" "}
                      <option value="Odisha" label="Odisha"></option>{" "}
                      <option value="Punjab" label="Punjab"></option>{" "}
                      <option value="Rajasthan" label="Rajasthan"></option>{" "}
                      <option value="Sikkim" label="Sikkim"></option>{" "}
                      <option value="Tamil Nadu	" label="Tamil Nadu	"></option>{" "}
                      <option value="Telangana" label="Telangana"></option>{" "}
                      <option value="Tripura" label="Tripura"></option>{" "}
                      <option
                        value="Uttar Pradesh"
                        label="Uttar Pradesh"
                      ></option>{" "}
                      <option value="Uttarakhand" label="Uttarakhand"></option>{" "}
                      <option value="West Bengal" label="West Bengal"></option>{" "}
                    </select>
                    <div>
                      {errors.state && touched.state && (
                        <div
                          style={{
                            textAlign: "center",
                            color: " rgb(235, 54, 54)",
                            marginTop: 7,
                            fontSize: 14,
                            marginBottom: 20,
                            fontSize: "x-small",
                          }}
                          // className="input-feedback"
                        >
                          {errors.state}
                        </div>
                      )}{" "}
                    </div>
                  </div>
                  <div className="input-box">
                    <label>Age</label>
                    <input
                      name="age"
                      type="age"
                      placeholder="Enter your age number"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.age && touched.age && "error"}
                    />
                    {errors.age && touched.age && (
                      <div className="input-feedback">{errors.age}</div>
                    )}{" "}
                  </div>
                  <div className="input-box">
                    <label>Pincode</label>
                    <input
                      name="pincode"
                      type="phone"
                      placeholder="Enter your 6-digit pincode"
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.pincode && touched.pincode && "error"}
                    />
                    {errors.pincode && touched.pincode && (
                      <div className="input-feedback">{errors.pincode}</div>
                    )}{" "}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div style={{ marginRight: 50 }}>
                    <div
                      className="button"
                      onClick={() => {
                        resetForm({
                          name: "",
                          email: "",
                          dateofbirth: "",
                          state: "",
                          age: "",
                          pincode: "",
                        });
                        setTimeout(() => {
                          btnclose();
                        }, 500);
                      }}
                    >
                      Cancel
                    </div>
                  </div>{" "}
                  <div>
                    <button type="submit" disabled={isSubmitting}>
                      {editVal.name ? "Edit" : "Create"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddNewCandidate;
