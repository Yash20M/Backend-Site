// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const userSchema = new mongoose.Schema({
//     Name: {
//         type: String,
//         required: true,
//         minlength: 3
//     },

//     Email: {
//         type: String,
//         required: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("The email you have Entered is Invalid")
//             }
//         }
//     },

//     Phone: {
//         type: Number,
//         required: true,
//         min: 10
//     },

//     password: {
//         type: String,
//         minlength: 3
//     },
//     confirmPassword: {
//         type: String,
//         minlength: 3
//     },

//     Date: {
//         type: Date,
//         default: Date.now()
//     },

//     tokens: [{
//         token: {
//             type: String,
//             required: true
//         }
//     }]
// });

// userSchema.methods.generateAuthToken = async function () {
//     try {
//         const token = jwt.sign({ _id: this._id.toString()}, process.env.SECRET_KEY, {
//             expiresIn: "80 seconds"
//         });
//         this.tokens = this.tokens.concat({token:token});
//         return token;
//         console.log(token);   
//      }


//     catch (er) {
//         console.log(er);
//     }
// }

// userSchema.pre("save", async function (next) {
//     this.password = await bcryptjs.hash(this.password, 10);
//     this.confirmPassword = await bcryptjs.hash(this.confirmPassword, 10);
// });


// // Creating the Collection
// const User = new mongoose.model("User", userSchema);
// module.exports = User;


const { error } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        minlength: 3,
        required: true
    },

    Email: {
        type: String,
        min: 3,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("Email is Wrong")
            }
        }
    },

    Phone: {
        type: Number,
        min: 10,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    },

    Date: {
        type: Date,
        default: new Date(Date.now())
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({_id:this._id.toString()} , process.env.SECRET_KEY , {
            expiresIn:"500 seconds"
        });
        this.tokens = this.tokens.concat({token:token});
        return token
}
    catch (err) {
        console.log(err);
    }
}

userSchema.pre("save", async function (next) {
    this.password = await bcryptjs.hash(this.password, 10);
    this.confirmPassword = await bcryptjs.hash(this.confirmPassword, 10);
    next();
});

const User = new mongoose.model("practiceForm", userSchema);

module.exports = User;


