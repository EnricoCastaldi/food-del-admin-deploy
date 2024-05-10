import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image: {type:String,required:true},
    kal: {type:Number,required:true},
    category: {type:String,required:true}
})


const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;

/* {                           API FROM MAPI
    "id_dieta": 335, ok 
    "dieta_nazwa": "Sportowa", name ok
    "dieta_kod": "Sportowa", dieta_kod nok
    "lp": 1021, kal ?? ok
    "aktywne": 0, aktywne nok
    "uwagi": "", uwagi nok
    "dieta_kod_box": "Sportowa" category ?? ok
    }, */