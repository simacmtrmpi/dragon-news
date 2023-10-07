import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../config/firebase";

// context api
export const AuthContextAPI = createContext(null);

// --->auth provider<---
// google
const googleProvider = new GoogleAuthProvider();

// github
const githubProvider = new GithubAuthProvider();

const AuthContext = ({ children }) => {
  // use state
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  // google
  const googleLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  // github
  const githubLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, githubProvider);
  };

  //   create user
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const loginUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logout = () => {
    setLoader(true);
    return signOut(auth);
  };

  // delete user
  const deleteTheUser = () => {
    setLoader(true);
    return deleteUser(auth.currentUser);
  };

  //observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoader(false);
    });

    return () => {
      unsubscribe;
    };
  }, []);

  // authentication object
  const authentication = {
    googleLogin,
    githubLogin,
    createUser,
    loginUser,
    logout,
    deleteTheUser,
    user,
    loader,
  };
  return (
    <AuthContextAPI.Provider value={authentication}>
      {children}
    </AuthContextAPI.Provider>
  );
};

AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
