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



  //   const html = `
  //   <!DOCTYPE html>
  // <html lang="en">

  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <title>Fitwell Hub</title>
  // </head>

  // <body style="text-align: center; width: 50%;margin: auto; line-height:30px;font-family: arial,helvetica,sans-serif; font-size: large;">
  //     <h1 style="margin-bottom: 10px;">Fitwell Hub</h1>
  //     <hr style="width: 50%; border: 1px solid #2196f3">
  //     <p>
  //       Dear,  ${name}, your appointment has been booked with Dr. ${doctor}. At the time of your appointment please join
  //         the ${medium} (see instructions below). Please make sure your webcam, microphone and speakers are working and
  //         that you have a strong internet connection.
  //     </p>
  //     <p style="font-weight: bold;">Join the ${medium} using the button below. iPhone/iPad users (iOS) must use Safari
  //         web browser, on all other devices use Google Chrome web browser.</p>

  //         <a href="${videoCallLink}" window.location.href="${questionairLink}" style="border: 2px solid #2196f3;background: #fff; padding: 15px 30px;margin-bottom: 10px;color: #2196f3;font-size: large;">Complete your Medical Intake Form!</a>
  //         <p style="margin-top: 20px;">If you have not already, please complete your Medical Intake Form using the button
  //         below. This is mandatory to be completed before your appointment.</p>
  //         <a href="${videoCallLink}" style="background-color: #2196f3; color: white; border: none; padding: 15px 30px;font-size: large;">Join Video
  //             Call</a>
  //         <div><img src="https://sss-g-server.vercel.app/api/v1/image/email/calendar.png" alt="Calendar Icon" style="vertical-align: middle;">
  //         </div>
  //         <div><strong style="margin-left: 10px;">${date}</strong>
  //         </div>
  //         <div><img src="https://sss-g-server.vercel.app/api/v1/image/email/clock.png" alt="Clock Icon" style="vertical-align: middle;">
  //         </div>
  //         <div><strong style="margin-left: 10px;">${time}</strong>
  //         </div>
  //     <button style="border: 2px solid #2196f3;color: #2196f3; background: #fff;padding: 15px 30px;font-size: large; margin-top: 20px;">CANCEL APPOINTMENT</button>
  //     <div style="margin-top: 20px;">
  //         <button style="background-color: #2196f3; color: white; border: none; width: 100%;padding:20px 0 20px 0; margin-bottom: 20px;">Fitwell Hub</button>
  //     </div>
  // </body>

  // </html>

  //   `

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
        body:JSON.stringify({
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

module.exports = { gmailSender }
