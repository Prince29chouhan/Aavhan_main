import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";



import taskRoute from "./route/task.js";
import userRoute from "./route/user.js";
import submissionRoute from "./route/submission.js"

const app = express();

app.use(cors(
    {
        origin: "https://peaceful-sfogliatella-cbab5f.netlify.app/",
        credentials: true,
        methods: ["GET", "POST"]
    }
));
app.use(express.json());


dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI

//connect to mongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB"); 
} catch (error) {
    console.log("Error connecting to MongoDB", error);
}

app.use("/task", taskRoute);
app.use("/user", userRoute);
app.use("/submission", submissionRoute);

if(process.env.NODE_ENV === "production"){
    const dirPath = path.resolve();
    app.use(express.static("Frontend/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath, "Frontend", "dist", "index.html"));
        });
        
}


app.listen(PORT, () => {
    console.log(`APP IS LISTENING ON PORT ${PORT} !`)
})