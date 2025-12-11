import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import "./App.css";
import "./style.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="" element={<SignIn></SignIn>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
