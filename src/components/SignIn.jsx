import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSigninIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    if (!isSigninIn) {
      setIsSigningIn(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => navigate("/home"))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="shadow p-5">
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

          <button type="submit" className="btn btn-primary">
            Belépés
          </button>
        </form>
        <div>Még nincs fiókja?</div>
        <Link to="/signup">Regisztráció</Link>
      </div>
    </>
  );
}

export default SignIn;
