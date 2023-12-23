import React from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <nav>
      <Link to="/"><button>Home</button></Link>
      <Link to="/signup"><button>Register</button></Link>
      <Link to="/login"><button>Login</button></Link>
    
    <Link to="/cart">
    <div className='cart-btn'>
      {/* <img src={ShoppingCartIcon} alt="no-img"/> */}
     <button className='carticon'><ShoppingCartIcon/></button> 
      <span className='cart-icon-css-number'>0</span>
    </div>
    </Link>

      <Link to="/userprofile">
    < AccountCircleIcon className="profile-icon"></AccountCircleIcon>
   
    </Link>
    
    </nav>
  )
}

export default Navbar