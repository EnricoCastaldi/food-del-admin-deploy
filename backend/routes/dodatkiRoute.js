import express from "express"
import { addDodatki, listDodatki, removeDodatki } from "../controllers/dodatkiController.js"
import multer from "multer"


const dodatkiRouter = express.Router();

// Image Storage

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) =>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

dodatkiRouter.post("/addDod",upload.single("image"),addDodatki);
dodatkiRouter.get("/listDod",listDodatki);
dodatkiRouter.post("/removeDod",removeDodatki);


export default dodatkiRouter;