import {
  BrowserRouter,
  Route,
 
  Routes,
  
  Link,
} from "react-router-dom";
import "./App.css";

import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";
import 'antd/dist/antd.css'; 

// import 'semantic-ui-css/semantic.min.css';
// import 'semantic-ui-css/semantic.js';

function App() {
  const [pop, setpop] = useState(false);
  const handleOpenModal = () => {
    setpop(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
      

        <Routes>
          <Route path="signupform" element={<SignUpForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/homepage" element={<HomePage  handleclick={handleOpenModal}/>} />
       
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
