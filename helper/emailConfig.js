const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:  587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'bijoybhattacharyya4@gmail.com', // Admin Gmail ID
      pass: 'wjum bfvl ubsa dnrk', // Admin Gmail Password
    },
  })
  
  module.exports= transporter
