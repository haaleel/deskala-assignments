import React from "react";
import { Formik } from "formik";
// import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import firebasedb from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
function SignUpForm() {
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const onSignUp = async (email, password, phone) => {
    try {
      await firebasedb
        .auth()
        .createUserWithEmailAndPassword(email, password, phone)
        .then(() => {
          navigate("/");
        });
      console.log("create account sucesfully created", email, password, phone);
      // firebasedb.collection("users").doc(authUser.user.email).set({
      //   ower_uid: authUser.user.uid,
      //   phone: phone,
      //   email: authUser.user.email,

      // });
    } catch (error) {
      alert("hi ", error.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", phone: "", password: "" }}
        onSubmit={(values) => {
          onSignUp(values.email, values.password, values.phone);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Minimum 8 Alpha Numaric.")
            .min(8, "Must be 8 characters or more")
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number"),

          phone: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")

            .required("A phone number is required"),

          // .positive("A phone number can't start with a minus")
          // .integer("A phone number can't include a decimal point"),
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
          } = props;
          return (
            <div className="form-container">
              <div className="colm-form">
                <form className="mainforms" onSubmit={handleSubmit}>
                  {" "}
                  <h1 style={{ textAlign: "center", margin: 35, fontSize: 25 }}>
                    SignUp
                  </h1>
                  <label htmlFor="email">Email</label>
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
                  <label htmlFor="email">Phone Number</label>
                  <input
                    name="phone"
                    type="phone"
                    placeholder="Enter your phone number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.phone && touched.phone && "error"}
                  />
                  {errors.phone && touched.phone && (
                    <div className="input-feedback">{errors.phone}</div>
                  )}
                  <label htmlFor="email">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password && "error"}
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                  <div
                    style={{
                      textAlign: "end",
                      justifyContent: "flex-end",
                      fontSize: 10,
                      marginBottom: 10,
                    }}
                  >
                    {" "}
                    <Link to="/">Login here</Link>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button type="submit" disabled={isSubmitting}>
                      SignUp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignUpForm;
