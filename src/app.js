// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const express = require("express");
// const path = require("path");
// const port = process.env.PORT || 80;
// const hbs = require('hbs')
// const bcryptjs = require("bcryptjs");
// const nodemailer = require("nodemailer");
// const smtpTransport = require("nodemailer-smtp-transport");
// const jwt = require("jsonwebtoken");
// const app = express();


// // Requiring the Files
// require("./db/conn");
// const auth = require("./middleware/auth");
// const User = require("./models/userMessage");


// // Seeting the Paths
// const staticPath = (path.join(__dirname, "../public"))
// const viewsPath = path.join(__dirname, "../templates/views")
// const partialsPath = path.join(__dirname, "../templates/partials")
// // middle Ware
// app.use(express.static(staticPath));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cookieParser())


// // Setting HBS engine that is our template Engine
// app.set("view engine", "hbs");
// app.set("views", viewsPath)
// hbs.registerPartials(partialsPath)


// // app.use("/mail" , require("./sendEmail"));

// // Routing
// app.get("/", (req, res) => {
//     res.render("index")
// });

// app.get("/secret", auth, (req, res) => {
//     res.render("SecretPage")
// })

// app.get("/logout", auth, async (req, res) => {
//     try{
//         // res.clearCookie("jwt");
//         console.log( `the user is ${ req.tokens}`);
//         res.render("index");
//         console.log("You have been logout Successfully");
//     }
//     catch(err){
//         console.log(err);
//     }
// })

// app.post("/contact", async (req, res) => {
//     try {

//         let password = req.body.password;
//         let c_password = req.body.confirmPassword;


//         if (password === c_password) {
//             const userData = new User(req.body);
//             const token = await userData.generateAuthToken();
//             await userData.save();

//             res.cookie("jwt", token, {
//                 expires: new Date(Date.now() + 900000),
//                 httpOnly: true
//             });

//             res.render("index");
//             console.log("Your form  has been submmitterd Successfully");


//         }
//         else {
//             res.send("Password Didnt Match please Entrer Again")
//         }
//     }
//     catch (err) {
//         res.status(500).send(err);
//     }
// });

// app.post("/login", async (req, res) => {
//     try {
//         const email = req.body.Email;
//         const password = req.body.password;

//         const userMail = await User.findOne({ Email: email });
//         const isMatch = await bcryptjs.compare(req.body.password, userMail.password);

//         const token = await userMail.generateAuthToken();
//         console.log(token);

//         res.cookie("jwt", token, {
//             expires: new Date(Date.now() + 900000),
//             httpOnly: true
//         })
//         console.log(`Our Cokkies are ${req.cookies.jwt}`);

//         // console.log(isMatch);
//         if (isMatch) {
//             res.status(201).render("SecretPage");
//             console.log("Logged in Successfully");
//         }
//         else {
//             res.status(401).send("Invalid Login Credentials");
//         }




//     } catch (error) {
//         console.log(error);
//         res.status(401).send(error)
//     }
// });

// app.listen(port, '127.0.0.1', () => {
//     console.log(`http://127.0.0.1:${port}`);
// });
require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 80;
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const app = express();


// using the MiddleWare


// Requing the Files
const viewsPath = path.join(__dirname, "../templates/views");
const staticPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

require("./db/conn")
const User = require("./models/userMessage");
const auth = require("./middleware/auth");


// setting the Engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Using the Middle Ware
app.use(cookieParser());
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.render("index")
});

app.get("/secret", auth, (req, res) => {
    res.render("SecretPage")
});

app.get("/logout", auth, async (req, res) => {
    try {
        // await req.User.save();
        // res.clearCookie("jwt");
        res.clearCookie();
        // req.getUser.tokens = [];
        res.render("index");
        console.log("You have Logged our Successfully");
    }
    catch (err) {
        console.log(err);
        res.status(501).send(err)
    }
})

app.post("/contact", async (req, res) => {
    try {
        // console.log(req.body);
        const userData = new User(req.body);
        const token = await userData.generateAuthToken();
        // console.log(token);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 5000000),
            httpOnly: true,
            secure: true,
        });

        let transporter = nodemailer.createTransport({
            service:"gmail.com",
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:'yash65mahalle@gmail.com',
                pass:"nthdjpggoifmfubf"
            }
        });

        let mailOption = {
            from:"yash65mahalle@gmail.com",
            to:'yash44mahalle@gmail.com',
            subject:"Web Info",
            text:   `
                    Name: ${req.body.Name},
                    Mail :${req.body.Mail},
                    Phone:${req.body.Phone}`
        }

        transporter.sendMail(mailOption , (err,info)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('Messafe send');
            }
        })

        if (req.body.password === req.body.confirmPassword) {
            await userData.save();
            console.log(userData);
            res.render("index")
        }
        else {
            res.send("Password didn't match")
        }
    }
    catch (err) {
        console.log(err);
        res.status(501).send(err)
    }
});

app.post("/secret", async (req, res) => {
    try {
        const usermail = req.body.Email;
        const userPass = req.body.password;

        const mail = await User.findOne({ Email: req.body.Email });
        const token = await mail.generateAuthToken();
        // console.log(token);
        const isMatch = await bcryptjs.compare(userPass, mail.password);


        console.log(res.cookie);


        if (isMatch) {
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 300000),
                httpOnly: true,
                secure: true
            });
            res.status(201).render("SecretPage");
            console.log("Successfully login");
        }
        else {
            res.status(501).send("Invalid Login");
        }




    }
    catch (err) {
        console.log(err);
    }
})

app.listen(port, "127.0.0.1", () => {
    console.log(`http://127.0.0.1:${port}`);
})


