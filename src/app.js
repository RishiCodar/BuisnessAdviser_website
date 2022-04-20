// require("dotenv").config();
const express=require("express");
require("./db/conn");
const User = require("./models/usercontact")
const Register = require("./models/userregis")
const bcrypt = require("bcryptjs");
const path = require("path");
const hbs = require("hbs");
const cookieParser=require("cookie-parser");
const app = express();

const port = process.env.PORT || 3000;
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

// middleware 
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended : false}));
app.set("view engine","hbs");
app.set("views",templatepath);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(staticpath));
hbs.registerPartials(partialpath);


// routing 
app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

// contact form
app.post("/contact",async (req,res)=>{
    try {
        // res.send(req.body);
        const userData= new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
         res.status(500).send(error);
    }
});

// registartion form
// app.post("/register",async (req,res)=>{
//     try {
//         const password=req.body.password;
//         const cpassword=req.body.confirmpassword;
//         if(password===cpassword){
//              const registerEmployee=new Register({
//                 firstname:req.body.firstname,
//                 lastname:req.body.lastname,
//                 email:req.body.email,
//                 password:password,
//                 confirmpassword:cpassword,
//                 gender:req.body.gender
//              });
//              const token =await registerEmployee.generateAuthToken();
//              console.log(token);
             
//              res.cookie("jwt",token,{
//                 expires:new Date(Date.now()+30000),
//                 httpOnly:true
//             });
//              console.log(cookie);

//              const registered=await registerEmployee.save();
//              res.status(201).render("index");
//         }else{
//             res.send("password is not matching");
//         }
//     } catch (error) {
//         res.status(400).send(error);
        
//     };
// });


app.listen(port,()=>{
    console.log(`Listing the server at port no ${port}`);
})
