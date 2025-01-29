const express = require('express');
require("dotenv").config();
const { connectMongoDB } = require('./connection')
const readerRouter = require('./routes/readerRoute')
const writerRouter = require('./routes/writerRoute')
const app = express();

const URI = process.env.ATLAS_URI

// mongoose connection
connectMongoDB(URI)
    .then(() => console.log("MongoDB connected!!"))


// Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors({ origin: 'https://pen-and-paper-gilt.vercel.app/' }));

// Routes
app.use("/api/writer", writerRouter)
app.use("/api/reader", readerRouter)

app.listen(5000, () => {
    console.log("Server is running on 5000...!");
})