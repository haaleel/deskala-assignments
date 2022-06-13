import React, { useEffect } from "react";
import "../components/HomePage.css";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebasedb from "../firebase";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useState } from "react";

import AddNewCandidate from "./AddNewCandidate";
const initilaVal = {
  name: "",
  email: "",
  dateofbirth: "",
  state: "",
  age: "",
  pincode: "",
};
function HomePage() {
  const navigate = useNavigate();

  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  // const auth = getAuth();
  const handlSignOut = async () => {
    try {
      await firebasedb
        .auth()
        .signOut()
        .then(() => {
          navigate("/");
        });

      console.log("sucessfull signout");
    } catch (error) {
      console.log(error);
    }
  };

  const handleclick = () => {
    setshowForm(!showForm);
  };
  const handleclickdelete = (key) => {
    setdeletedlist(key);
    setpopdelete(!popdelete);}

   
  // table data
  const [contact, setContact] = useState([]);
  const [showForm, setshowForm] = useState(false);
  const [selectedContact, setselectedContact] = useState(initilaVal);
  const [selectedIndex, setselectedIndex] = useState(null);
const[popdelete,setpopdelete]=useState()

const[deletedlist, setdeletedlist]=useState()


const handleDeletelist=()=>{
  const deleteData = [...contact];
             deleteData.splice(deletedlist, 1 );
             setContact([...deleteData]);
             setpopdelete(false);
             setdeletedlist(null);
}
              // console.log(stateData);
          

  const handleEdit = (val, index) => {
    setselectedContact(val);
    setselectedIndex(index);
    setdeletedlist(index)
    setTimeout(() => {
      setshowForm(true);
    }, 1000);
  };
  //   const deleteItem =  (id) =>{
  // setContact=(contact.splice(id!==id))

  //   }
  return (
    <div>
     <div>candidate list {contact.length}</div>
{/* Table */}
      
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Dateofbirth</th>
              <th>Email</th>
              <th>result</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contact.map((details, key) => {
              return (
                <tr key={key}>
                   <td>{key+1}</td>
                  <td>{details.name}</td>
                  <td>{details.dateofbirth}</td>
                  {/* <td>{details.phoneNumber}</td> */}
                  <td>{details.email}</td>

                  <td>
                    <select>
                      <option value="" label="shortlist">
                        shortlist{" "}
                      </option>
                      <option value="" label="rejected">
                        rejected{" "}
                      </option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <div style={{cursor:'pointer' , }}onClick={() => handleEdit(details, key)}>
                        <img className="img" src="edit.png" />
                      </div>

                      <div style={{cursor:'pointer',marginLeft:15}} onClick={() => handleclickdelete(key)}>
                        <img
                          className="img"
                          src="delete.png"
                          style={{ color: "blue" }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between",marginLeft:20,marginRight:20 }}>
        <div className="new-candidate" onClick={() => handleclick()}>
          {" "}
          +Add New candidate
        </div>

        <h4 style={{ cursor: "pointer", margin: 0 }} onClick={handlSignOut}>
          {" "}
          Log out{" "}
        </h4>
      </div>
{/* deletepopup */}
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          backgroundColor: "#00000042",
          justifyContent: "center",
          overflow: "hidden",
          display: popdelete? "flex":"none"   
        }}
      >  
     
        <div className="deletepopup"> <div style={{fontSize:18}}>Do you delete ?</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: 15,  
               
            }}
          >
          
            <button  onClick={()=>{setpopdelete(!popdelete);
             setdeletedlist(null);}}     >No</button>
            <button onClick={()=>handleDeletelist()}>Yes</button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          backgroundColor: "#00000042",
          justifyContent: "center",
          overflow: "hidden",
          display: showForm ? "flex" : "none",
        }}
      >
        <AddNewCandidate
          btnclose={() => {
            setshowForm(!showForm);
            setselectedContact(initilaVal);
            setselectedIndex(null);
          }}
          editVal={selectedContact}
          handleNewCandidate={(val, type) => {
            console.log(type, val, selectedIndex);
            if (type === "edit") {
              const stateData = [...contact];
              stateData.splice(selectedIndex, 1, val);
              // console.log(stateData);
              setContact([...stateData]);
            } else {
              if (contact.length === 0) {
                val["id"] = 1;
              } else {
                const lastId = contact[contact.length - 1].id;
                val["id"] = lastId + 1;
              }
              setContact((contact) => [...contact, val]);
            }
            setselectedContact(initilaVal);
            setselectedIndex(null);
            setshowForm(false);
          }}
        />
      </div>
    </div>
  );
}

export default HomePage;
