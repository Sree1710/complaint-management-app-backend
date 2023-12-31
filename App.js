const express=require('express')
const bodyParser=require('body-parser')
const Cors=require('cors')
const mongoose=require('mongoose')
const userModel = require('./userModel')
const complaintModel = require('./complaintModel')
const jwt=require('jsonwebtoken')

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
        jwt.sign({user:getUsername,password:getPassword},"complaintApp",{expiresIn:"1d"},
        (error,token)=>{
        if (error) {
            response.json({"status":"error"})
        } else {
            response.json({"status":"success","data":result[0],"token":token})
        }
        })
        
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

app.post("/viewmc",async(request,response)=>{
    let data=request.body
    console.log(data)
    let result=await complaintModel.find(data)
    response.json(result)
})

app.post("/deletec",async(request,response)=>{
    let data=request.body
    console.log(data)
    let result=await complaintModel.find(data).deleteOne().exec()
    if (result.acknowledged==true) {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})

app.post("/viewac",async(request,response)=>{
    let token=request.body.token
    let result=await complaintModel.find()
    jwt.verify(token,"complaintApp",(error,decoded)=>{
        if (decoded && decoded.user) {
            console.log("Verified")
            console.log(result)
            response.json(result)  
        } else {
            response.json({"status":"unauthorized user"})
        }
    })
    
})


app.post("/updateac",async(request,response)=>{
    let data=request.body
    let newData={
        Remarks:data.Remarks,
        Status:data.Status
    }
    let updateParameter={compId:data.compId}
    let result=await complaintModel.findOneAndUpdate(updateParameter,newData)
    response.json({"status":"success"})
})

app.post("/getcompdata",async(request,response)=>{
    let compid=request.body
    let result=await complaintModel.find(compid)
    response.json(result)
})











app.listen(3001,()=>{
    console.log("Server Running")
})