import React,{useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Navbar from '../Navbar';
import ProductContainer from "./ProductContainer";
import "./AllProducts.css";
import { collection, query, onSnapshot, getDocs} from "firebase/firestore";
import {db} from '../../firebaseConfig/Firebase';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';
import AddProduct from '../AddProduct';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderProductCard from './SliderProductCard';


const ProductSlider = (props) => {
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
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
  return (
    <div>
    <Carousel responsive={responsive}>
{products.map((prod)=>{

   return (<SliderProductCard key={prod.id} product={prod}/>);
})}
</Carousel>

</div>
  )
}

export default ProductSlider