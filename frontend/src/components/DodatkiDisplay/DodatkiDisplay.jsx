import React, { useContext } from 'react'
import './DodatkiDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import DodatkiItem from '../DodatkiItem/DodatkiItem'

const DodatkiDisplay = ({category}) => {

    const {dodatki_list} = useContext(StoreContext)

  return (
    <div className='dodatki-display' id='dodatki-display'>
        <h2>Dodatki</h2>
        <div className='dodatki-display-list'>
            {dodatki_list.map((item,index)=>{
              if(category==="All" || category===item.category){
                return <DodatkiItem key={index} id ={item._id} name={item.name} description={item.description} kal={item.kal} price={item.price} image={item.image}  />
              }
            } 
        )}
        </div>
    </div>
  )
}

export default DodatkiDisplay
