import React,{useEffect, useState} from 'react'
import Navbar from './Navbar'
import {auth, db, storage} from '../firebaseConfig/Firebase';
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';
import "./AddProduct.css"
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
const AddProduct = () => {

// console.log("add producc", props);
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

  const [productTitle, setproductTitle]=useState("");
  const [productType, setproductType]=useState("");
  const [description, setdescription]=useState("");
  const [brand, setbrand]=useState("");
  const [customerSupport, setcustomerSupport]=useState("");
  const [price, setPrice]=useState("");
  const [warranty, setWarranty]=useState("");
  const [productImage, setproductImage]=useState("");
 const types=['image/jpg', 'image/jpeg','image/png','image/PNG' ];
  const handleProductImage=(e)=>{
 e.preventDefault();

 let selectedFile=e.target.files[0]
 if (selectedFile){
 
  if(selectedFile && types.includes(selectedFile.type)){
    setproductImage(selectedFile);
    // setTimeout(()=>{
    //   toast.success("Image added Successfully");
    //    },1000)
   
  }else{
    setproductImage(null);
    toast.error("Please select a valid image file type!")
  }
 }else{
  
  toast.error("Please Select Your File")
 }

  }

  const handleAddProduct=(e)=>{
e.preventDefault();
const stoargeRef=ref(storage, `products-images/${productType.toUpperCase()}/${productTitle}`)
//  console.log(stoargeRef._location.path)
uploadBytes(stoargeRef, productImage).then(()=>{
  getDownloadURL(stoargeRef).then(url=>{
addDoc(collection(db, `products${productType.toUpperCase()}`),{
  productTitle,
  productType,
  description,
  price,
  warranty,
  productImage: url
}).then(()=>{
  toast.success("Product Added Successfully1")
}).catch((error)=>{
  toast.error("Product Not Added Successfully!")
})


  })
} )
}

 
  return (
    <>
    <Navbar/>
    
     {loggeduser && loggeduser[0].Email=="abbas12@gmail.com"?
     <div className='addprod-container'>
     <form className='addprod-form'>
        <p>Add Data</p>

        <label>Product Title</label>
        <input type="text" onChange={(e)=>{setproductTitle(e.target.value)}} placeholder='Product Title'/>

        <label>Product Type</label>
        <input type="text" onChange={(e)=>{setproductType(e.target.value)}} placeholder='Product Type'/>

        <label>Product Description</label>
        <textarea onChange={(e)=>{setdescription(e.target.value)}} placeholder='Breifly Describe your product.'></textarea>

        <label>Price</label>
        <input type="number" onChange={(e)=>{setPrice(e.target.value)}} placeholder='$$'/>

        <label>productImage</label>
        <input type="file" onChange={handleProductImage} />
 
        <label>Warranty </label>
        <input type="text" onChange={(e)=>{setWarranty(e.target.value)}} placeholder="Product Warranty"/>
      
<div className='addproduct-btn'>
<button type="submit" onClick={handleAddProduct} >Add</button>
</div>

     </form>
     </div>:
     <div> <p>You dont havve access to product</p></div>}
     

    </>
   
  )
}

export default AddProduct