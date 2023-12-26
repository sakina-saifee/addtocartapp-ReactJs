import React,{useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';



const ProductContainer = (props) => {
    console.log("hi", props)
console.log("product container",props.key)
    return (
        <>
        {console.log("pro", props.key)}
        {/* <div>{product.product.productTitle}</div> */}
        </>
    )
}

export default ProductContainer;