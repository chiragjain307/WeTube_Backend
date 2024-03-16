import express, { urlencoded }  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
})) //use for all middleware and configuration

app.use(express.json({limit: "16kb"})) //accepting json data from the frontend (like contact form data)

app.use(urlencoded({extended: true, limit: "16kb"})) //accepting form data from url or backend (since every url encoding rules are different) ex. %20 for space

app.use(express.static("public")) //if we want to store files like images, pdf, videos etc. // and accessible to the public //store in public folder

app.use(cookieParser()) //browser cookies can only be accessed by the server and crud operations can be performed on them //secure cookies can only be accessed by the server and not by the client


export { app }