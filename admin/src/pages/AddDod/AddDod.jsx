import React, { useState } from 'react'
import './AddDod.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'



const AddDod = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        kal:"",
        category:"Low Carb"
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("kal",Number(data.kal))
        formData.append("image",image)

        const response = await axios.post(`${url}/api/dodatki/addDod`,formData);
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                kal: "",
                category:"Low Carb"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='addDod'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="addDod-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image"  hidden required />
            </div>
            <div className='addDod-product-name flex-col'>
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' required/>
            </div>
            <div className="addDod-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Description...' required></textarea>
            </div>
            <div className="addDod-category-price">
                <div className="addDod-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" >
                        <option value="Low Carb">Low Carb</option>
                        <option value="Wege. z rybą">Wege. z rybą</option>
                        <option value="Z niskim indeksem">Z niskim indeksem</option>
                        <option value="Sportowa">Sportowa</option>
                        <option value="Klasyczna">Klasyczna</option>
                        <option value="Wegetariańska">Wegetariańska</option>
                        <option value="Ketogeniczna">Ketogeniczna</option>
                        <option value="Z niskim IG">Z niskim IG</option>
                    </select>
                </div>
                <div className='addDod-category flex-col'>
                    <p>Product Kalories</p>
                    <input onChange={onChangeHandler} value={data.kal} type="Number" name="kal" placeholder='0' />
                </div>
                <div className='addDod-category-price flex-col'>
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='0 zł' />
                </div>
            </div>
            <button type='submit' className='addDod-btn'>ADD</button>
        </form>
    </div>
  )
}

export default AddDod
