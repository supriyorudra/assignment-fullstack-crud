const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/TaskRoute');

// Variables

const cors = require('cors');

const app = express();

const PORT = process.env.PORT | 5050;


//Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MONGO_DB is connected");
    })
    .catch((err)=>{
        console.log("ERROR: " + err);
    })

//Middlewares

app.use(express.json());
app.use(cors());
    
app.use("/api", routes);

app.listen(PORT, ()=>{
    console.log(`Listening to port : http://localhost:${PORT}`);
})