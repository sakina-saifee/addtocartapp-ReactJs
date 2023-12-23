import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Banner from "./Banner";
import {auth, db} from '../firebaseConfig/Firebase';
import {collection, getDocs, query, where} from 'firebase/firestore';

const Home = () => {
  
  function GetCurrentUser(){
    const [user, setUser]=useState('');
    const usersCollectionREf=collection(db,"users")

useEffect(()=>{
  auth.onAuthStateChanged(userlogged=>{
    if(userlogged){
      const getUsers=async()=>{
        const q=query(collection(db,"users"),where("uid","==",userlogged.uid))
          // console.log(q);
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
  console.log(loggeduser[0])

  }
  return (
    <>
      <Navbar />
      <Banner/>
      <Products />
    </>
  );
};

export default Home;
