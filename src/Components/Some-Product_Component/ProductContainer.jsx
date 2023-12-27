import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllProducts.css";

const ProductContainer = (props) => {
  return (
    <>
      <div className="product-container">
        <img src={props.product.productImage} />
        {/* {props.product.productTitle} */}
        <div className="product-details">
          <p className="producttitle">{props.product.productTitle}</p>

          <div className="price-container">
            <p className="price">${props.product.price}</p>
          </div>

          <div className="buy-cart">
            {/* <Link
              to={`/product/${props.product.id}/${props.product.productTitle}`}
            >
              <button className="btn">Show More </button>
            </Link> */}

            <Link
              to={`/product/${props.product.id}/${props.product.productType}`}
            >
              <button className="btn">Show More &gt;</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
