const nodemailer = require('nodemailer');
const images = require('./image')
// const transporter = nodemailer.createTransport({
//   service: 'SMTP',
//   host: 'smtp.hostinger.com',
//   port: 465,
//   // secure: true,
//   auth: {
//     user: 'no-replay@fitwellhub.com',
//     pass: 'No-Replay@password@1212',
//   },
// });
const gmailSender = async (to, subject, name, doctor, medium, date, time, questionairLink, videoCallLink, req, phone, password) => {
  console.log("process started", to)

  const html = `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fitwell Hub</title>
</head>

<body style="text-align: center; width: 50%;margin: auto; line-height:30px;font-family: arial,helvetica,sans-serif; font-size: large;">
    <h1 style="margin-bottom: 10px;">Fitwell Hub</h1>
    <hr style="width: 50%; border: 1px solid #2196f3">
    <p>
      Dear,  ${name}, your appointment has been started .
    </p>
    <p style="font-weight: bold;">Before joining the session you must have to complete you medical intake. iPhone/iPad users (iOS) must use Safari
        web browser, on all other devices use Google Chrome web browser.</p>
    <p style="font-weight: bold;">You can logged in to your account with  the following credentials
    ID: ${phone}, Password:${password}.</p>
   
        <a href="${videoCallLink}" window.location.href="${videoCallLink}" style="border: 2px solid #2196f3;background: #fff; padding: 15px 30px;margin-bottom: 10px;color: #2196f3;font-size: large;">Complete your Medical Intake Form!</a>
    <div style="margin-top: 20px;">
        <button style="background-color: #2196f3; color: white; border: none; width: 100%;padding:20px 0 20px 0; margin-bottom: 20px;">Fitwell Hub</button>
    </div>
</body>

</html>
  
  `
  const sendEmail = await fetch('https://glonetex-email-service.vercel.app/fitwell/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: to,
      subject,
      html,
    })
  })
  console.log("sendEmail", sendEmail)
  // const mailOptions = {
  //   from: 'no-replay@fitwellhub.com',
  //   to,
  //   subject,
  //   html
  // };
  // // console.log("mailOptions===>",mailOptions)
  // transporter.sendMail(mailOptions, (error, info) => {
  //   console.log("error===>", error)
  //   console.log("info===>", info)
  //   if (error) {
  //     return false
  //   } else {
  //     return true
  //   }
  // });
}
const inviteDoctor = async (to, subject, html) => {
  const sendEmail = await fetch('https://glonetex-email-service.vercel.app/fitwell/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: to,
      subject,
      html,
    })
  })
  const response = await sendEmail?.json();
  console.log("response", response)
  return response
}

module.exports = { gmailSender, inviteDoctor }
