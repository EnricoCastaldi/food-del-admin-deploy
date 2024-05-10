import React, { useEffect } from 'react'
import './ListDod.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListDod = ({url}) => {

  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/dodatki/listDod`);
    if (response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeDod = async(dodatkiId) => {
      const response = await axios.post(`${url}/api/dodatki/removeDod`,{id:dodatkiId});
      await fetchList();
      if(response.data.success) {
        toast.success(response.data.message)
      }
      else{
        toast.error("Error")
      }
  }


  useEffect (()=>{
    fetchList();
  },[])

  return (
    <div className='listDod add flex-col'>
      <p>All Dodatki List</p>
      <div className="list-table">
        <div className="listDod-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Calories</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.kal}</p>
              <p>{item.price} zł</p>
              <p onClick={()=>removeDod(item._id)} className='cursor'>X</p>
            </div>
            )
        })}
      </div>

    </div>
  )
}

export default ListDod
