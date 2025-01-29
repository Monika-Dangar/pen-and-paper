const express = require('express');
require("dotenv").config();
const { connectMongoDB } = require('./connection')
const readerRouter = require('./routes/readerRoute')
const writerRouter = require('./routes/writerRoute')
const app = express();

const URI = process.env.ATLAS_URI

// mongoose connection
// connectMongoDB('mongodb://127.0.0.1:27017/pen-and-paper-1')
connectMongoDB(URI)
    .then(() => console.log("MongoDB connected!!"))


// Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

// Routes
app.use("/api/writer", writerRouter)
app.use("/api/reader", readerRouter)

app.listen(5000, () => {
    console.log("Server is running on 5000...!");
})