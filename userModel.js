const mongoose=require('mongoose')
const userModel=mongoose.model("users",mongoose.Schema(
    {
        name:{type:String,required:true},
        dob:String,
        age:String,
        address:String,
        mobileNumber:String,
        username:String,
        password:String
    }
))
module.exports=userModel