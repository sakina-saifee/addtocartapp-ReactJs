import React,{useState} from 'react'
import Navbar from './Navbar'
import {Link, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../firebaseConfig/Firebase';
import {collection, addDoc} from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';

import './Signup.css'; 

const Signup = () => {

const [username, setusername]=useState("");
const [mobilenumber, setMobilenumber]=useState("");
const [email, setEmail]=useState("");
const [password, setPassword]=useState("");
const [address, setAddress]=useState("");
  
  const navigate=useNavigate();

const handleSubmit=(e)=>{
  
  e.preventDefault();
  console.log('timds')
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredentials)=>{
    const user=userCredentials.user;
    const initialCartValue=0;
    console.log(user);

    addDoc(collection(db,"users"),{
      Username:username,  
      Email:email,
      Mobilenumber:mobilenumber,
      Password:password,
      Address:address,
      CartValue: initialCartValue,
      uid: user.uid
      
    }).then(()=>{
      console.log("New user Adddedd!!!!!")
       toast.success("New User Added Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setusername("")
    setMobilenumber("")
    setEmail("")
    setPassword("")
    setAddress("")
     setTimeout(()=>{
          navigate('/login'); 
     },4000);
    }).catch((error)=>{
        console.log("New user NOT Adddedd!!!!!")
      toast.error("User Not Created!")
    })
  }).catch((error)=>{
  
       toast.error("Please fill all required Fields");

    if(error.message==="Firebase: Error (auth/email-already-in-use)"){
       toast.error("User Already Exists!");
    }
  })

}
  const Username=(e)=>{
    console.log("username", e)
    setusername(e);
  }
   const Mobile=(e)=>{
    console.log("Mobile", e)
setMobilenumber(e);
  }
   const Email=(e)=>{
      console.log("Email", e)
setEmail(e);
  }
   const Password=(e)=>{
    console.log("Password", e)
setPassword(e);
  }
  const Address=(e)=>{
    console.log("Address", e)
setAddress(e)
  }
  return (
      <>
    <Navbar/>
   <div className='signup-container'>
    <form className='signup-form'>
      <p>Create Account</p>

      <label>Your Name</label>
      <input type="text" placeholder='First and Last name here..' onChange={(e)=>Username(e.target.value)}/>

       <label>Mobile Phone Number</label>
      <input type="text" placeholder='Mobile Number here..' onChange={(e)=>Mobile(e.target.value)}/>
    

     <label>Email</label>
      <input type="text" placeholder='Email here..' onChange={(e)=>Email(e.target.value)}/>
    

     <label>Password</label>
      <input type="text" placeholder='Password here..' onChange={(e)=>Password(e.target.value)}/>
    

     <label>Address</label>
      <textarea type="textarea" onChange={(e)=>Address(e.target.value)}> </textarea>
    <button onClick={handleSubmit}>Sign Up</button>

    <div className='alreadyhaveaccdiv'>
      <span>Already Have an Account?</span>
      <Link to='/login' className='loginLabel'>Log In</Link>
    </div>
    
    
    </form>
    
    </div>

    </>
  )
}

export default Signup