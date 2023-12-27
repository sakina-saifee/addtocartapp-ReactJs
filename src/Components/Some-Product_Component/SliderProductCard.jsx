import React from "react";
import './Sliderproduct.css'
import {Link, useNavigate} from 'react-router-dom';
const SliderProductCard = (props) => {
  return (
    <>
      <div className="mini-product-container">
        <div className="mini-img-container">
          <img src={props.product.productImage} />
        </div>

        <div className="mini-product-details">
          <p className="mini-producttitle">{props.product.productTitle}</p>

          <div className="mini-price-container">
            <p className="price">${props.product.price}</p>
          </div>

         <p className="warranty">Warranty{props.product.warranty}</p>


     
        <Link to={`/product/${props.product.id}/${props.product.productType}`}> 
        <button className='show-more'>Show More &gt;</button>
        
        </Link>
        </div>
      </div>
    </>
  );
};

export default SliderProductCard;
