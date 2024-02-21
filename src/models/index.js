const models = {
  user: require('./user'),
  doctor: require('./doctor'),
  doctorSchedules: require('./doctorSchedules'),
  doctorAppointment: require('./doctorAppointment'),
  clinic: require('./clinic'),
  appiontment: require('./appiontment'),
  patient: require('./patient'),
  userMeetings: require('./userMeetings'),
  questionTypes: require('./questionTypes'),
  questionFolder: require('./questionFolder'),
  questionGroup: require('./questionGroup'),
  question: require('./question'),
  answer: require('./answer'),
  settings: require('./settings'),
  doctorAvailability: require('./doctorAvailability'),
  vitals: require('./vitals'),
  questionaire: require('./questionaire'),
  doctorQuestionireChanges: require('./doctorQuestionireChanges'),
  platform: require('./platform'),
  sickNote: require('./sickNote'),
  prescription: require('./prescription'),
  referral: require('./referral'),
  requisition: require('./requisition'),
  doctorNote: require('./doctorNote'),
};

module.exports = models;
