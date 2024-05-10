import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}}
}, {minimize: false});

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;

/* MAPI API {
    "id_uzytkownik":0, oK
    "email":"pUser_Email" OK
    "haslo":"HASLO", OK
    "czy_newsletter":[1/0], NOK
    "rola":"[admin]",  NOK
    "czy_haslo_losowe":[1/0],NOK
    "token_resetu_hasla":""NOK
    }
     */