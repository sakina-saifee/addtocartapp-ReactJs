import React,{useEffect, useState} from 'react'
import Navbar from './Navbar'
import {auth, db} from '../firebaseConfig/Firebase';
import {collection, getDocs, query, where} from 'firebase/firestore';
const Profile = () => {

  function GetCurrentUser(){
    const [user, setUser]=useState('');
    const usersCollectionREf=collection(db,"users")

useEffect(()=>{
  auth.onAuthStateChanged(userlogged=>{
    if(userlogged){
      const getUsers=async()=>{
        const q=query(collection(db,"users"),where("uid","==",userlogged.uid))
          console.log(q);
          const data=await getDocs(q);
          setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      }
      getUsers();
    }else{
      setUser(null);
    }
  })
},[])

return user

  }

  const loggeduser=GetCurrentUser();
  if(loggeduser){
  console.log("from profile component",loggeduser[0])

  }
 
  return (
    <>
    <Navbar/>
    <div className='userprofile-container'>
     {loggeduser?
     <div className='user-profile'>
     <p>Your Account Details</p>
     </div>:<div>
      
      </div>}
     
    </div>
    </>
   
  )
}

export default Profile