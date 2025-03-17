const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:  587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sagnikduttaimps@gmail.com', // Admin Gmail ID
      pass: 'cplq izjc yizm owss', // Admin Gmail Password
    },
  })
  
  module.exports= transporter
