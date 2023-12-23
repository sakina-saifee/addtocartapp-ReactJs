import React,{useState} from 'react'
import Navbar from './Navbar'
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../firebaseConfig/Firebase';
import {collection, addDoc} from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';
import './Login.css';
const Login = () => {

  const [email, setEmail]=useState("");
const [password, setPassword]=useState("");
  const navigate=useNavigate();

 const Email=(e)=>{
      console.log("Email", e)
setEmail(e);
  }
   const Password=(e)=>{
    console.log("Password", e)
setPassword(e);
  }

const  handleLogin=(e)=>{
e.preventDefault();

signInWithEmailAndPassword(auth, email, password).then((userCredentials)=>{
  console.log(userCredentials)
   toast.success("User Logged in Successfully!");
  const user= userCredentials.user;
  console.log ("userr",user);
  setEmail("");
  setPassword("");
  setTimeout(()=>{
 navigate('/home')
  },4000)
}).catch((error)=>{

if(email=="" || password==""){
   toast.error("Please Fill The Required Fields!");

}
// if(email!==user.Email || password!==user.Password){
//      toast.error("Wrong Credentials!");
// }

  // if(error.message==="Firebase: Error (auth/invalid-credential)"){
  //  toast.error("Wrong Credentials!");
  // }

})


}

  return (
    <>
    <Navbar/>
    <div className='login-container'>
    <form className='login-form'>
      <p>Log In</p>

  
     <label>Email</label>
      <input type="text" placeholder='Email here..' onChange={(e)=>Email(e.target.value)}/>
    

     <label>Password</label>
      <input type="text" placeholder='Password here..' onChange={(e)=>Password(e.target.value)}/>
    
    <button onClick={handleLogin}>Log In</button>

    <div className='createNewaccdiv'>
      <span>Create New Account</span>
      <Link to='/signup' className='signupLabel'>Sign Up</Link>
    </div>
    
    
    </form>
    
    </div>
    
    </>
  )
}

export default Login