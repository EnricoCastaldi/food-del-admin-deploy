import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount,token,food_list,cartItems,url,getFoodTotal,getDodatkiTotal,dodatki_list} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })


    const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
  
    let orderItems = [];
  
    // Add food_list items
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Create a copy of the item
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    // Add dodatki_list items
    dodatki_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Create a copy of the item
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Assuming delivery fee is always 2
    };
  
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again later.");
    }
  };

  const navigate = useNavigate();

  useEffect(()=>{
      if(!token){
          navigate('/cart')
      }
      else if(getTotalCartAmount()===0){
        navigate('/cart')
      }
  },[token])

  return (
    <form onSubmit={(event) => placeOrder(event)} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangehandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangehandler} value={data.lastName} type="text" placeholder='Second Name' />
        </div>
        <input required name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street'onChange={onChangehandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangehandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangehandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangehandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangehandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangehandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Menu</p>
              <p>{getFoodTotal()}  zł</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Dodatki</p>
              <p>{getDodatkiTotal()} zł</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:2}  zł</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total days</p>
              <p>{}  dni</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total Discount</p>
              <p>{}  %</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}  zł</b>
            </div>
            <hr />
          </div>
          <button onClick={()=>navigate('/order')}>CHECKOUT</button>
        </div>


      </div>


    </form>
  )
}

export default PlaceOrder
