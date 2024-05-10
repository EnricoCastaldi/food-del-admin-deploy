import dodatkiModel from "../models/dodatkiModel.js";
import fs from 'fs'


// add dodatki item

const addDodatki = async (req,res) =>{

    let image_filename = `${req.file.filename}`

    const dodatki = new dodatkiModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price, 
        image:image_filename,
        category:req.body.category,
        kal:req.body.kal
    })
    try{
        await dodatki.save();
        res.json({success:true,message:"Dodatki Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all dodatki list

const listDodatki = async (req,res) =>{
    try{
        const dodatkis = await dodatkiModel.find({});
        res.json({success:true,data:dodatkis})
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove dodatki item

const removeDodatki = async (req,res) =>{
    try{
        const dodatki = await dodatkiModel.findById(req.body.id);
        fs.unlink(`uploads/${dodatki.image}`, ()=>{})

        await dodatkiModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Dodatki removed"})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}



export{addDodatki,listDodatki,removeDodatki}