import React from "react";
import {useState} from "react";
import box from "../images/croppedbox.gif";
import conveyorbox from "../images/conveyor2.gif";
import { auth, provider,yahooProvider } from "../firebase-config";
import { signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";

export const Register = ({ setIsAuth }) => {
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/products");
    });
  };
  const signInWithYahoo = () => {
    signInWithPopup(auth, yahooProvider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/products");
    });
  };
  const signInWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/products");
    });
  };
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailHandler = (e) =>
  {
    setEmail(e.target.value)
    console.log(email)

  } 
  const passwordHandler = (e) =>
  {
    setPassword(e.target.value)
    console.log(password)
  } 
 return (
   <div className="flex-1  hero flex-col">
  {/* <Navbar /> */}
  <div className="hero-content flex-col lg:flex-col ">
    <div className="card flex-shrink-0 w-full sm:w-96 max-w-sm shadow-4xl bg-inherit">
      <div className="card-body shadow-4xl">
        <div className="form-control">
          <label className="label text-white">
            <span className="label-text text-white font-bold">Email</span>
          </label>
          <input type="text" placeholder="email" onChange={emailHandler} className="input input-bordered bg-white" />
        </div>
        <div className="form-control">
          <label className="label text-white">
            <span className="label-text text-white font-bold" >Password</span>
          </label>
          <input type="password" placeholder="password" onChange={passwordHandler} className="input input-bordered bg-white" />
          <label className="label text-white">
            <Link to="/login">Already have an account?</Link>
          </label>
        </div>
        <div className="form-control ">
          <button className="btn btn-primary" onClick={signInWithEmail}>Register</button>
        </div>
        <div className="divider">OR</div>        
        <div className="text-center self-center w-72 -mt-4 text-white">If you're a recruiter and want to try the app without making an account</div>
        <div className='form-control mt-3 '><button className='btn btn-primary ' onClick={()=>{
          setIsAuth(true);
          navigate("/products");
        }
          }>Access App here</button>
        </div>
        <div className="divider">OR</div>
        <div className='form-control mt-3'><button className='btn btn-primary' onClick={signInWithGoogle}>Login with google</button>
        <div className='form-control mt-3'><button className='btn btn-primary' onClick={signInWithYahoo}>Login with Yahoo!</button></div>
        
        </div>
      </div>
    </div>
  </div>
</div>
  );
};
