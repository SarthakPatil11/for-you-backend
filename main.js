// imports 

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
// import * as bodyParser from "body-parser";
// import cors from "cors";
const cors = require('cors')

const app = express();
app.use(cors())
const PORT = process.env.PORT || '8080';

// database connection 
try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", (error) => console.log('error'));
    db.once("open", () => console.log("connected to database!"));
    console.log('Connected Successfully..');
} catch (err) {
    console.log(err);
}



// set template engine

app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//     res.send("Server is listening");
// });



app.use(express.json())
// router set

app.use("/user", require('./routers/user.routes'))
app.use("/chapter", require('./routers/chapter.routes'))
app.use("/assignment", require('./routers/assignment.routes'))
app.use("/image", require('./routers/image.routes'))

app.listen(PORT, () => {
    console.log(`server started at https://127.0.0.1:${PORT}`);
});

