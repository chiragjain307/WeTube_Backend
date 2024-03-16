//third approach

import {connectDB} from './db/index.js'
import dotenv from 'dotenv'
import {app} from './app.js'

dotenv.config({path: './.env'})

connectDB()
.then(()=>{
    app.on('error', (error)=>{
        console.log('Error in db connection: ', error)
        throw new error
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port: ${process.env.PORT || 8000}`)
    })
})
.catch((error)=>{
    console.log('Error in db connection: ', error)
})
























/*
import mongoose from 'mongoose'
import {DB_NAME} from './consants'

import express from 'express'
const app = express()

//First approach
// function db (){}
// db()
*/


/*
// now this approach is also good but we have writeen all the db connection code in the same file as the server code.  This is not a good practice.
// so we will use another file to connect to the db and then we will use the db connection in the index file i.e. this file.

//Second approach
// we use iife to instantly connect db with the web when it loads.

require('dotenv').config({path: './.env'}) // Not a good practice to use this in production

import mongoose from 'mongoose'
import {DB_NAME} from './constants'

import express from 'express'
const app = express()


( async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected: Hosted on: ${connection.connection.host}`)
        app.on('error', (error)=>{
            console.log('Error in db connection: ', error)
            throw new error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.log('Error in db connection: ', error)
        throw new error
    }
} )()
*/