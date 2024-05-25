import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkSignupValidation } from "../utilities/validation";
import { auth, firestore } from "../utilities/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { OLX_LOGO } from "../utilities/constants";
import Header from "./header";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const nameValue = nameRef.current.value;
    const emailValue = emailRef.current.value;
    const phoneValue = phoneRef.current.value;
    const passwordValue = passwordRef.current.value;

    const message = checkSignupValidation(nameValue, emailValue, phoneValue, passwordValue);
    setErrorMessage(message);
    if (message) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
      const user = userCredential.user;

      await updateProfile(user, { displayName: nameValue });

      const userData = { uid: user.uid, email: emailValue, name: nameValue, phone: phoneValue };
      await addDoc(collection(firestore, "users"), userData);

      navigate("/");
    } catch (error) {
      setErrorMessage('email already in use');
    }
  };

  return (
    <div>
      <Header/>
    <div className="flex justify-center items-center h-screen">
      <div className="border-solid border-black border-2 w-64 mx-auto pink rounded-lg">
        <div>
          <img className="p-14" src={OLX_LOGO} alt="OLX Logo" />
        </div>
        <div className="p-5">
          <h5>Username</h5>
          <input ref={nameRef} type="text" className="border-b border-solid border-black outline-none" />
          <h5>Email</h5>
          <input ref={emailRef} type="email" className="border-b border-solid border-black outline-none" />
          <h5>Phone</h5>
          <input ref={phoneRef} type="number" className="border-b border-solid border-black outline-none" />
          <h5>Password</h5>
          <input ref={passwordRef} type="password" className="border-b border-solid border-black outline-none" />
          <p className="pt-3 text-red-600">{errorMessage}</p>
          <button onClick={handleSignup} className="bg-black text-white py-4 mt-5 px-20">
            Signup
          </button>
          <div className="text-center">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
