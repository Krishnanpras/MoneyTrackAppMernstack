const mongoose=require('mongoose');
const {Schema,model}=mongoose;


const TransacationSchema=new Schema({
    name:{type:String ,required:true},
    price:{type:Number},
    description:{type:String,required:true},
    datetime:{type:Date,required:true}
});


const TransacationModel=model('Tansaction',TransacationSchema);
module.exports=TransacationModel;