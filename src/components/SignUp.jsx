import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => navigate("/home")
    );
  };

  return (
    <>
      <div className="box small">
        <h1 className="pb-5">Regisztráció</h1>
        <form onSubmit={signUp}>
          <div className="form-group">
            <label>Felhasználónév</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label>Email-cím</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label>Jelszó</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            ></input>
          </div>

          <button type="submit" className="btn btn-success">
            Regisztráció
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
