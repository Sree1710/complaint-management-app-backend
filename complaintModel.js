const mongoose=require('mongoose')
const complaintModel=mongoose.model("comps",mongoose.Schema(
    {
        compId:{type:String,required:true},
        compTitle:String,
        compDesc:String,
        compLocation:String,
        compDate:String,
        Remarks:String,
        Status:String
    }
))
module.exports=complaintModel