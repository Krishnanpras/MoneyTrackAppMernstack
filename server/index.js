const express=require('express');
const cors=require('cors');
const app=express();

//if we dont use we will get undefined
require('dotenv').config();

const Transacation=require("./models/Transaction.js");
const { default: mongoose } = require('mongoose');

//To communicate with frontend to back end
app.use(cors());

app.use(express.json());
 
app.post('/api/transaction',async(req,res)=>{
   await mongoose.connect(process.env.MONOGO_URL);

   const{name,description,datetime,price}=req.body;
   const transaction= await Transacation.create({name,description,datetime,price})
    res.json(transaction);

})

app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(process.env.MONOGO_URL);
    const transactions=await Transacation.find();
    res.json(transactions);

});

app.listen(4030,()=>{
    console.log("port is running 4030")
})