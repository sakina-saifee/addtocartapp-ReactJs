import React,{useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Navbar from '../Navbar';
import ProductContainer from "./ProductContainer";
import "./AllProducts.css";
import { collection, query, onSnapshot, getDocs} from "firebase/firestore";
import {db} from '../../firebaseConfig/Firebase';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';

const AllProducts = (props) => {
 console.log(props.type);
 const [products, setProducts]=useState([]);
 useEffect(()=>{
    const getProducts=()=>{
      const productsArray=[];
      const path=`products${props.type.toUpperCase()}`;
      console.log(path);
    getDocs(collection(db, path)).then((snapshot)=>{
        snapshot.forEach((doc)=>{
            console.log(doc.data);
            productsArray.push({...doc.data(), id:doc.id})
            console.log(doc.id, "=>", doc.data());
        })
        setProducts(productsArray)
    }).catch((error)=>{
        toast.error("Not Rendered Properly")

        
    })
    }
    getProducts();
 },[])

 console.log("produtcs", products)
    return (
        <>
        <div className='allproductspage'>
            <Navbar/>
            <div className='heading'>
                <p>Top Results for {props.type}</p>
            </div>

            <div className='allProductContainer'>
             {products.map((product)=>{
              
                <ProductContainer
                
                key={product.id}
                product={product}
                
                />
             })}
            </div>
        </div>
        </>
    )
}

export default AllProducts;