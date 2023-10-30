const express=require('express')
const bodyParser=require('body-parser')
const Cors=require('cors')
const mongoose=require('mongoose')
const userModel = require('./userModel')
const complaintModel = require('./complaintModel')

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/complaintDB?retryWrites=true&w=majority",{useNewUrlParser:true})


app.post("/regc",async(request,response)=>{
    let data=request.body
    const user=new userModel(data)
    let result=await user.save()
    if (result.name!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})

app.post("/loginc",async(request,response)=>{
    let data=request.body
    let getUsername=data.username
    let getPassword=data.password
    let result=await userModel.find({username:getUsername})
    if (result.length>0) {
      if (result[0].password==getPassword) {
        response.json({"status":"success","data":result[0]})
      } else {
        response.json({"status":"Incorrect Username or Password!!"})
      } 
    } else {
        response.json({"status":"Username Does Not Exist!!"})
    }
})


app.post("/addc",async(request,response)=>{
    let data=request.body
    const complaint=new complaintModel(data)
    let result=await complaint.save()
    if (result.compId!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})



















app.listen(3001,()=>{
    console.log("Server Running")
})