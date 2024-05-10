import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items: {type:Array,required:true},
    amount: {type:Number,required:true},
    address: {type:Object,required:true},
    status: {type:String,default:"Order Processing"},
    date: {type:Date,default:Date.now()},
    payment: {type:Boolean,default:false}

})

const orderModel =mongoose.models.order || mongoose.model ("order",orderSchema)
export default orderModel;


/*  MAPI API  `{"data":[
    {
    "zamowienia": [
    {
    "id_zamowienie": 0,
    "hash_id": "", // hash_id ma być puste – nadawane jest przez nas po dodaniu zamówienia do bazy
    "akcja_mkod": "%AKCJA_MKOD%",
    "data_zamowienia": "2022-10-24T13:09:03.431+02:00",
    "id_klient": 0,
    "id_status": 0,
    "id_typ_platnosci": 0,
    // id_status i id_typ_platnosci – przy dodaniu mają być puste – po dodaniu zamówienia zostaną przypisnae wartości domyślne
    "d_potwierdzenia_platnosci": "1899-12-30T00:00:00.000+01:00",
    "klient": {
    "Id_klient": 0,
    "Imie": "Jan",
    "Nazwisko": "Nowak",
    "Telefon": "71-348-66-21",
    "Email": "jan.nowak@gmail.com",
    "NIP": "-",
    "CzyFirma": 0,
    "adresy": [
    {
    "id_adres": 0,
    "id_klient": 0, "id_miejsce_dostawy”: 2, "id_godzina_dostawy”: 1,
    "Miasto": "Wrocław",
    "KodPocztowy": "51-657",
    "ulica": "Kazimierska",
    "NrBudynku": "1",
    "NrLokalu": "17",
    "Dzielnica": "Dąbie",
    "Klatka": "5",
    "KodKlatki": "1517",
    "Pietro": "8",
    "MiesjceDostawy": "MKOD_TYP_MIEJSCA_DOST_POD_DRZWI",
    "GodzinaDostawy": "MKOD_DO_7_RANO", "NotatkaAdresu ": "Notatka do adresu"
    // NotatkaAdresu: tutaj wpisuje się uwagi do adresu, dotyczące miejsca pozostawienia paczki
    }
    ]
    }, */