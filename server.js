const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const dbConnect = require('./db/dbConnect');
const User = require('./db/userModel');
const bcrypt = require('bcrypt');
const jxt = require('jsonwebtoken');
const auth = require('./auth');
const userRoute = require('./routes/userRoute');
const app = express();


dotenv.config();
dbConnect();
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
app.use(express.json());
app.use(express.static('public'));
app.use ('api/users', userRoute);
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });
// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});