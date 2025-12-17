import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const mongoURI=process.env.URI;
app.use(cors());
app.use(express.json());
mongoose.connect(mongoURI).then(()=>{console.log("connected")}).catch((err)=>{console.log(err)});

const newSchema = new mongoose.Schema({
    name: { type: String, required: true },
  brand: { type: String, required: true },
  price: Number,
  category: String,
  ratings: Number,
  ImageBase64: String

})
const newModel = mongoose.model('items',newSchema,'testings');

app.get("/api", async (req,res)=>{
try {
        // FIX 3: You MUST 'await' the database result
        const data = await newModel.find({}); 
        console.log("data",data.length);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

app.listen("5000",()=>{
    console.log("running");
})