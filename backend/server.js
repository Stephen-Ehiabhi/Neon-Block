//Installed Modules
const express = require('express');
const path = require("path");
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

require('dotenv').config();

//import routes
const subs = require('./routes/subs');

//calling express...
const app = express();
const log = console.log;
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.static('../frontend/assets'));
app.use(express.static('../frontend/assets/images'));
app.use(express.static('../frontend/assets/css'));
app.use(express.static('../frontend/assets/js'));
app.use(express.static('../frontend/assets/fonts'));

//route handlers
app.use("/api", subs)

//data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//send mail route
app.get("/",(req,res)=>{
     res.sendFile(path.join(__dirname, "../frontend", 'index.html'))
})


//send mail route
app.post("/send-mail", async (req,res)=>{
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul> 
  <h3>Mesage</h3>
  <p>${req.body.message}</p>
  `;

  
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "mail.google.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ACCOUNT.USER', // generated ethereal user
    pass: 'ACCOUNT.PASS'
  },
  tls:{
    rejectUnauthorize: false
  }
});

// send mail with defined transport object
let info = await transporter.sendMail({
  from: '"Nodemailer contact"', // sender address
  to: "EMAIL", // list of receivers
  subject: "Node contact request", // Subject line
  text: "Hello world?", // plain text body
  html: output // html body
});

//send mail with defined transport object
transporter.sendMail(mailOptions,(error, info)=>{
if (error) {
   return log(error)
}
console.log("Message sent: %s", info.messageId);
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
res.send("Email sent")
})


})


//connect to db
const conn = mongoose.connect(process.env.URI,{ useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true })

conn.then((result)=>{
app.listen(process.env.PORT, () => console.log(`Neon-Block Server is Up and connected to DB on Port: ${process.env.PORT}...`));
}).catch((err) => log("server error: " + err))
  