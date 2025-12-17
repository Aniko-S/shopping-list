import React, { useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({ isUserLoggedIn: false, user: null });

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = async (user) => {
    if (user) {
      setUser({ ...user });
      setIsUserLoggedIn(true);
    } else {
      setUser(null);
      setIsUserLoggedIn(false);
    }
  };

  const ctxValue = {
    user,
    isUserLoggedIn,
  };

  return <AuthContext value={ctxValue}>{children}</AuthContext>;
};
