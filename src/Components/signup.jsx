import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkSignupValidation } from "../utilities/validation";
import { firestore, auth } from "../utilities/firebase"; // Import initialized services
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Import collection and addDoc functions
import { OLX_LOGO } from "../utilities/constants";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleSignupValidation = async () => {
    const emailValue = email.current.value;

    const message = checkSignupValidation(
      name.current.value,
      emailValue,
      phone.current.value,
      password.current.value
    );

    setErrorMessage(message);
    if (message) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        password.current.value
      );

      const user = userCredential.user;
      await updateProfile(user, { displayName: name.current.value });

      const { uid, displayName } = user;
      const userData = { uid, email: emailValue, name: displayName };

      // Add user data to Firestore
      await addDoc(collection(firestore, "users"), userData);

      navigate("/"); // Redirect to home or login page
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-solid border-black border-2 w-64 mx-auto pink rounded-lg">
        <div>
          <img className="p-14" src={OLX_LOGO} alt="" />
        </div>
        <div className="p-5">
          <h5>Username</h5>
          <input
            ref={name}
            type="text"
            className="border-b border-solid border-black outline-none"
          />
          <h5>Email</h5>
          <input
            ref={email}
            type="email"
            className="border-b border-solid border-black outline-none"
          />
          <h5>Phone</h5>
          <input
            ref={phone}
            type="number"
            className="border-b border-solid border-black outline-none"
          />
          <h5>Password</h5>
          <input
            ref={password}
            type="password"
            className="border-b border-solid border-black outline-none"
          />
          <p className="pt-3 text-red-600">{errorMessage}</p>
          <button
            onClick={handleSignupValidation}
            className="bg-black text-white py-4 mt-5 px-20"
          >
            Signup
          </button>
          <div className="text-center">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
