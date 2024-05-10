import mongoose from "mongoose";

const dodatkiSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image: {type:String,required:true},
    kal: {type:Number,required:true},
    category: {type:String,required:true}
})


const dodatkiModel = mongoose.models.dodatki || mongoose.model("dodatki",dodatkiSchema)

export default dodatkiModel;

/*  MAPI API
"dodatki": [
    {
    "id_dodatek": 4, ok
    "dodatek_nazwa": "Koktail witaminowy",ok
    "jm": "Por",
    "ilosc": 5
    }, */