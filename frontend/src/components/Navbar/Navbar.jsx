import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { jwtDecode } from "jwt-decode";


const Navbar = ({setShowLogin}) => {


  const [userName, setUserName] = useState("");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext); 
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
          try {
              const decoded = jwtDecode(token);
              setUserName(decoded.name);
          } catch (error) {
              console.error("Error decoding token:", error);
          }
      }
  }, []);


const [menu,setMenu] = useState("menu");

const logout = () => {
  localStorage.removeItem("token");
  setToken("");
  navigate("/")
}

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("Diets")} className={menu==="Diets"?"active":""}>Diets</a>
        <a href='#dodatki-display' onClick={()=>setMenu("Dodatki")} className={menu==="Dodatki"?"active":""}>Dodatki</a>
        <a href='#app-download' onClick={()=>setMenu("Mobile-app")} className={menu==="Mobile-app"?"active":""} >Mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("Contact us")} className={menu==="Contact us"?"active":""}>Contact us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Log In</button>
            :<div className='navbar-profile'>
             <div className="navbar-profile-container">
                    <img src={assets.profile_icon} alt="" />
                    {userName && <div className='navbar-user'>Hello, {userName}</div>}
                </div>
              <ul className='navbar-profile-dropdown'>
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>}
      </div>
    </div>
  )
}

export default Navbar
