import './DodatkiItem.css'
import { assets } from '../../assets/assets'
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';



const DodatkiItem = ({id,name,price,description,image,kal}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='dodatki-item'>
        <div className="dodatki-item-img-container">
            <img className='dodatki-item-image' src={url+"/images/"+image} alt="" />
            {!cartItems[id]
                    ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
                    : <div className='dodatki-item-counter'>
                            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
            }
        </div>
        <div className="dodatki-item-info">
            <div className="dodatki-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="dodatki-item-desc">{description}</p>
            <p className="dodatki-item-kal">{kal} Kal</p>
            <p className="dodatki-item-price">{price} zł/Dzien</p>
        </div>
    </div>
  )
}

export default DodatkiItem
