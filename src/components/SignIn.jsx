import { useState, useContext } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

function SignIn() {
  const { isUserLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSigninIn, setIsSigningIn] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    if (!isSigninIn) {
      setIsSigningIn(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {})
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {isUserLoggedIn && <Navigate to="/home"></Navigate>}
      <div className="box samll">
        <h1 className="pb-5">Bejelentkezés</h1>

        <form onSubmit={signIn}>
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
            Belépés
          </button>
        </form>

        <div className="p-5">
          <div>Még nincs fiókja?</div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
