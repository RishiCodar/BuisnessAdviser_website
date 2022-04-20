
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// schema define
const empolyeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    tokens: [
        {
        token: {
            type: String,
            required: true,
            },
        }
    ],
});

// Generating Token
empolyeeSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign(
            { _id: this._id.toString()},
            process.env.SECRET_KEY
        );
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
        console.log(error);
    }
};

// hash method
empolyeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
    next();
});

// collection creation
const Register = new mongoose.model("Register", empolyeeSchema);

module.exports = Register;
