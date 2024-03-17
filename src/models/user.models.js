import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true //when we want to search by username, it will be faster
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //using Cloudinary
        required: true
    },
    coverImage: {
        type: String, //using Cloudinary
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"], //we can also give a custom message
    },
    refreshTokens: {
        type: String
    }

}, { timestamps: true })



//We always using normal function because arrow function does not have this keyword

// to store encrypted password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } else {
        next()
    }
})

// to verify password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) //return a boolean value
}

// to generate JWT token
userSchema.methods.generateAccessTokens = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName //all this are comming from database
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshTokens = function () {
    return jwt.sign(
        {
            _id: this._id, //all this are comming from database
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)