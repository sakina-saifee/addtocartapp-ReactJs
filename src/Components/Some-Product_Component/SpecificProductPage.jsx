import React, { useEffect, useState } from 'react'
import Navbar  from '../Navbar';
import { useParams } from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../../firebaseConfig/Firebase';
import {collection, doc, getDoc, query, where, getDocs, addDoc} from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';
import ProductSlider from './ProductSlider';
import './SpecificProduct.css';


const SpecificProductPage = () => {
  const {id, productType}=useParams();
  const [product, setProduct]=useState("");


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
  // console.log("from profile component",loggeduser[0])

  }


const getProduct=async()=>{
  console.log("or",`products${productType.toUpperCase()}` )
     const docRef=doc(db,`products${productType.toUpperCase()}`, id);
     const docSnap=await getDoc(docRef);
     console.log(docSnap.data())
     setProduct(docSnap.data());
    };


  useEffect(()=>{
    if(id){
    getProduct()
    
    }
    
      },[id])

function handleAddToCart(){
if(loggeduser){
addDoc(collection(db,`cart-${loggeduser[0].uid}`),{
  product,
  quantity:1
}).then(()=>{
  toast.success("Product Added To Cart")
}).catch((error)=>{
  toast.error("Product Not Added Successfully!")
})
}else{
  toast.error("You need to login first!");
}

} 

 return (
   <>
   <Navbar/>
  
     {product?
     
     <div className='myprod-container'>

      <div className='prod-img-cont'>
        <img src={product.productImage}/>
      </div>

        <div className='prod-data'>
          <p className='prod-head'>{product.productTitle}</p>
          <p className='prod-head'>{product.price}</p>
          <p className='prod-head'>{product.description}</p>

      </div>

      <button onClick={handleAddToCart} className='addtocartbtn'>Add to Cart</button>

     </div>:<div>Loading..</div>}
   </>

     
 
  )
}

export default SpecificProductPage