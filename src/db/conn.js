// const mongoose = require("mongoose");

// // Connecting to the Data-Base
// mongoose.connect("mongodb://localhost:27017/DynamicSite")
// .then(() => {
//     console.log("Connection Successfull")
// }).catch((err) => {
//     console.log(err);
// });

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/DynamicSite")
.then(() => {
    console.log("Connection Successfull")
}).catch((err) => {
    console.log(err);
});