import { useRef, useState } from "react"
import { OLX_LOGO } from "../utilities/constants"
import { Link, useNavigate } from "react-router-dom"
import { checkLoginValidation } from "../utilities/validation"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () =>{
    const email = useRef(null)
    const password = useRef(null)
    const [errorMessage,setErrorMessage] = useState(null)
    const navigate = useNavigate()


    const handleValidation = () =>{
        const message = checkLoginValidation(email.current.value,password.current.value)
        setErrorMessage(message)
        if(message) return
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+' '+errorMessage)
        });

    }

    return(
        <div className="flex justify-center items-center h-screen">
            <div className=" border-solid border-black  border-2 w-64 mx-auto pink rounded-lg">
                <div>
                    <img className=' p-14' src={OLX_LOGO} alt="" />
                </div>
                <div className="p-5">
                    <h5>email</h5>
                    <input ref={email} type="email" className="border-b border-solid border-black outline-none" />
                    <h5>Password</h5>
                    <input ref={password} type="password" className="border-b border-solid border-black  outline-none" />
                    <p className="pt-3 text-red-600">{errorMessage}</p>
                    <button onClick={handleValidation} className="bg-black text-white py-4 mt-5  px-20">Sigin</button>
                    <div className="flex justify-center">
                        <Link to='/signup'>Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login