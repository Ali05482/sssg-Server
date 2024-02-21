const router = require("express").Router();
const auth = require("../controllers/auth/auth");
const middlewares = require("../../../middlewares/");
const validations = require("../../.././common/validations");
const users = require("../controllers/users/user");
const { insertEvent } = require("../controllers/apointment/googleCalander");

router.get(
  "/users",
  middlewares.authToken,
  middlewares.authorization("admin"),
  users.fetchAllUsers
); // Get All Users for admin
router.post(
  "/register",
  validations.registrationModule.validationOfRegistration,
  auth.register
); // Register a new user
const TIMESTAMP = '+05:00';
const dateTimeForCalender = () => {

  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMESTAMP}`;

  let event = new Date(Date.parse(newDateTime));

  let startDate = event;
  // Delay in end time is 1
  let endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

  return {
    'start': startDate,
    'end': endDate
  }
};
const attendeesEmails = [
  { 'email': 'abhai0548@gmail.com' },
  ];
const dateTime = dateTimeForCalender();
const event = {
  summary: 'Appointment with Name',
  start: {
    dateTime: dateTime['start'],
    timeZone: 'Asia/Karachi',
  },
  end: {
    dateTime: dateTime['end'],
    timeZone: 'Asia/Karachi',
  },
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', 'minutes': 24 * 60 },
      { method: 'popup', 'minutes': 10 },
    ],
  },
  conferenceDataVersion: 1,
  conferenceData: {
    createRequest: {
      conferenceSolutionKey: {
        type: 'hangoutsMeet',
      },
      requestId: 'demo-event-link', 
    },
    entryPoints: [
      {
        entryPointType: "video"
      }
    ],
  },

};
router.post(
  "/check",
  async (req, res) => {
    try {
      const data = await insertEvent(event);
      return res.json({
        status: true,
        msg: "Login Successfullyyyy",
        data: data,
      })
    } catch (error) {
      return res.json({
        status: true,
        msg: "Login Successfully",
        data: error.message,
      })
    }
  }
  // validations.registrationModule.validationOfRegistration,
  // auth.register
); // Register a new user
router.post(
  "/login",
  validations.registrationModule.validationOfLogin,
  auth.login
); // Login an existing user
router.post("/verify", middlewares.authToken, auth.verify); //Authorization
router.post(
  "/forget/send/mail",
  validations.registrationModule.validationOfForgotEmail,
  auth.forget.sendMail
); //Sending Mail
router.patch("/forget/change/password", auth.forget.changePassword); //Change Password

module.exports = router;
