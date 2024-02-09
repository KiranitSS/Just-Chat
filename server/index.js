const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

require("dotenv").config();
app.use(express.json({limit: '50mb'}));

app.use(cors());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = parseInt(process.env.PORT);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB connection established")
    })
    .catch((err) => {
        console.log(err.message)
    });

const server = app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});

