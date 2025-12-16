import SignIn from "./components/SignIn";
import Home from "./components/Home";
import "./App.css";
import "./style.css";
import { AuthContextProvider } from "./store/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="" element={<SignIn></SignIn>}></Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
