import React from "react";
import { Formik } from "formik";
import { Link,} from "react-router-dom";
import * as Yup from "yup";
import "../components/LoginForm.css";
import { useNavigate } from "react-router-dom";
// import { async } from "@firebase/util";
// const merge = require('deepmerge').default


import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebasedb from "../firebase";
import { Button } from "antd";


 


const LoginForm = () => {
const navigate=useNavigate();
  const OnLogin=async(email,password)=>{
    try{
      await firebasedb.auth().signInWithEmailAndPassword (email,password).then(()=>{navigate("homepage")})
      console.log("sucessful",email, password)  

     
    }catch(error){
    alert("Sorry User Not Found",error.message)
    console.log(error)
    }
  }



return (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values ,{resetForm})=>{
      OnLogin(values.email,values.password)
       resetForm({
      password: "",
      email: "",
     
    });

    }}
   
    
  
    
    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .required("No password provided.")
        // .min(8, "Minimum 8 Alpha Numaric.")
        // .matches(/(?=.*[0-9])/, "Password must contain a number."),
    })}
  >




    {( {
      
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } )=>(
      <>
        <div className="form-container">
          <div className="colm-form">
            <form className="mainforms" onSubmit={handleSubmit}>
              {" "}
              <h1 style={{ textAlign: "center", margin: 35 }}>Login</h1>
              <div>
                <label htmlFor="email">Email </label>
                <input
                autoFocus
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
              {/* if u want add  */}
           <div style={{fontSize:12,textAlign:"end"}}> <Link to="/signupform" >SignUp</Link></div>
              <div style={{marginTop:15,textAlign:"center"}}>
                <Button htmlType="submit" type="primary" shape="round">
                  Login
                </Button>
              {/* <button type="submit" disabled={isSubmitting}>
                Login
              </button> */}
              </div>
            </form>
          </div>
        </div>
     </>
  )  }
  </Formik>
 
  )
  }
export default LoginForm;
