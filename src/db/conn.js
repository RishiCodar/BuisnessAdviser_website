const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/projectdata").then(()=>{
    console.log("Connection Successful");
}).catch((error)=>{
    console.log(error);
});

// mongoose.connect("mongodb://localhost:27017/registrationdata").then(()=>{
//     console.log("Connection Successful");
// }).catch((error)=>{
//     console.log(error);
// });