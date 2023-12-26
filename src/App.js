
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PgFOF from './Components/PgFOF';
import Cart from './Components/Cart';
import Profile from './Components/Profile';
import { ToastContainer } from 'react-toastify';
import AddProduct from './Components/AddProduct';
import AllProducts from './Components/Some-Product_Component/AllProducts'
function App() {
  return (
 <>

 <BrowserRouter>
     <ToastContainer position="top-center"/>
 <Routes>
 <Route exact path="/" element={<Home/>}/>
 <Route exact path="/home" element={<Home/>}/>
 <Route exact path="/signup" element={<Signup/>}/>
 <Route exact path="/login" element={<Login/>}/>
 <Route exact path="/cart" element={<Cart/>}/>
<Route exact path="/profile" element={<Profile/>}/>
 <Route exact path="/addproduct" element={<AddProduct/>}/>
 <Route exact path="/product-type/mobiles" element={<AllProducts type={"mobile"}/>}/>
 <Route exact path="/product-type/laptops" element={<AllProducts type={"laptop"}/>}/>
 <Route exact path="/product-type/cameras" element={<AllProducts type={"camera"}/>}/>
 <Route exact path="/product-type/shoes" element={<AllProducts type={"shoes"}/>}/>

 <Route  path="*" element={<PgFOF/>}/>


 </Routes>


 </BrowserRouter>

 </>
  );
}

export default App;
