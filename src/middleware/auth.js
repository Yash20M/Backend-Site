// const jwt = require("jsonwebtoken");
// const User = require("../models/userMessage");

// const auth = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
//         next();
//         console.log(verifyUser);

//         const manageUser = await User.findOne({ _id: verifyUser._id });
//         console.log(manageUser);

//         req.token =token;
//         req.user = User;
//     }
//     catch (err) {
//         console.log(err);
//     }

// }

// module.exports = auth;


const jwt = require("jsonwebtoken");
const User = require("../models/userMessage");

const auth = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        const verifyUser = await jwt.verify(token , process.env.SECRET_KEY);
        next();
        console.log(token);

        const getUser = await User.findOne({_id:verifyUser._id});
        console.log(getUser.Name);

        req.getUser = getUser;
        req.token = token;

    }
    catch(err){
        console.log(err);
    }
}

module.exports = auth;