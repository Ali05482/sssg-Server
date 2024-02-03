const models = require("../../../../models");
const { validationResult } = require("express-validator");
const services = require("../../../../services");
const mongoose = require('mongoose')
const answer = {
  add: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
    }
    const isQuestion = await models.question.findById(req.body.questionId);
    if (!isQuestion) {
      return res.json({ status: false, msg: "Sorry this question group does not exists, please create one first", data: null });
    }
    const addAnswer = await models.answer.create(req.body);
    if (!addAnswer) {
      return res.json({ status: false, msg: "Something Went Wrong, Try again......", data: null });
    }
    await models.question.findByIdAndUpdate(isQuestion._id, { $push: { answers: addAnswer._id } })
    return res.json({ status: true, msg: "Answer created successfully", data: addAnswer });
  },
  checkObjectIdsExist: async (objectIds) => {
    try {
      // Find all documents that match the array of object IDs
      const foundDocuments = await models.question.find({
        _id: { $in: objectIds.map(id => new mongoose.Types.ObjectId(id)) },
      });
      const foundObjectIds = new Set(foundDocuments.map(doc => doc._id.toString()));

      // Find missing object IDs
      const missingObjectIds = objectIds.filter(id => !foundObjectIds.has(id));

      if (missingObjectIds.length === 0) {
        return { status: true, data: foundDocuments }
      } else {
        return { status: false, data: missingObjectIds }
      }
    } catch (error) {
      return { status: false, data: error.message }
    }
  },
  addMany: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
    }
    const isQuestion = await answer.checkObjectIdsExist(req.body.data.map(x => x.questionId));
    if (!isQuestion.status) {
      return res.json({ status: false, msg: "Sorry some question does not exists, please create one first", data: isQuestion });
    }
    const addAnswers = []
    for (let i = 0; i < req.body.data.length; i++) {
      const addAnswer = await models.answer.create(req.body.data[i]);
      if (addAnswer) {
        addAnswers.push(addAnswer)
        for (let j = 0; j < isQuestion.data.length; j++) {
          if (isQuestion.data[j]._id.toString() == addAnswer.questionId.toString()) {
            await models.question.findByIdAndUpdate(isQuestion.data[j]._id, { $push: { answers: addAnswer._id } })
          }
        }
      }
    }
    return res.json({ status: true, msg: "Answers created successfully", data: addAnswers });
  },
  addBulk: async (req, res) => {
    try {
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
      // }
      // console.log(req.body.totalQuestion)1
      // Creating Group and updating its folder
      const arrToBeDisplat = [];
      const createGroup = await models.questionGroup.create({
        name: req.body.questionGroup,
        questionFolderId: req.body.questionFolderId
      });
      if (createGroup) {
        await models.questionFolder.findByIdAndUpdate(
          req.body.questionFolderId,
          {
            $push: { questionGroupId: createGroup._id }
          }
        )
        arrToBeDisplat.push({ createdGroup: createGroup })
      }
      for (const myQuestions in req.body.totalQuestion) {
        if (req.body.totalQuestion.hasOwnProperty(myQuestions)) {
          const subObject = req.body.totalQuestion[myQuestions];
          const addQuestion = await models.question.create({
            name: subObject.question,
            questionGroupId: createGroup._id
          })
          if (addQuestion) {
            arrToBeDisplat.push({ createdQuestion: addQuestion })
            await models.questionGroup.findByIdAndUpdate(
              createGroup._id, { $push: { questionId: addQuestion._id } })
            console.log(`Question: ${subObject.question}`);

            console.log('Answers:');
            for (const answer of subObject.answers) {
              const key = Object.keys(answer)
              // console.log("ans======>", answer[key[0]].answer)
              console.log("ans======>", answer.answerType)
              const createAnswers = await models.answer.create({
                questionId: addQuestion._id,
                answer: answer[key[0]].answer,
                answerType: answer.answerType,
              })
              if (createAnswers) {
                arrToBeDisplat.push({ createdAnswers: createAnswers })
                await models.question.findByIdAndUpdate(addQuestion._id, {
                  $push: { answers: createAnswers._id }
                })
              }
            }
          }
        }
      }
      console.log(arrToBeDisplat)
      return res.json({ status: true, msg: "Questionaire Created Successfully", data: arrToBeDisplat })
    } catch (error) {
      console.log(error.message)
      return res.json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  edit: async (req, res) => {
    await services.generator.edit(
      req,
      res,
      models.answer,
      "Answer "
    );
  },
  getAll: async (req, res) => {
    await services.generator.getAll(
      req,
      res,
      models.answer,
      "Answer "
    );
  },
  getById: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to get Appointment", param: "id" }],
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.getById(
      req,
      res,
      models.answer,
      "Answer "
    );
  },
  getAllBtQuestionId: async (req, res) => {
    try {
      const answers = await models.answer.find({ questionId: req.params.id });
      return res.json({ status: true, msg: "Answers according to question", data: answers });
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: isNull });
    }
  },
  deleteById: async (req, res) => {

    await services.generator.deleteById(
      req,
      res,
      models.answer,
      "Answer "
    );
  },
  linkedQuestions: async (req, res) => {
    try {
      const linkedAnswers = [];
      const data = req.body?.data;
      for (let i = 0; i < data.length; i++) {
        const questionIds = data[i]?.questionIds.map((questionId) => ({
          questionId,
        }));
        const answer = await models?.answer?.findByIdAndUpdate(data[i]?.answerId, {
          $push: { linkedQuestion: { $each: questionIds } },
        });
        if (answer) {
          linkedAnswers.push(answer);
        }
      }
      return res.json({ status: true, msg: "Successfully Linked", linkedAnswers });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  collectAnswer: async (req, res) => {
    try {
      req.body.appointment = req.params.appointment;
      const checkIfAlready = await models.questionaire.findOne({ appointment: req.params.appointment });
      if (checkIfAlready) {
        console.log("req.body.appointment", req.body.appointment)
        await models.appiontment.findByIdAndUpdate(req.body.appointment, { questionaire: checkIfAlready?._id })
        return res.json({ status: false, msg: "Seems, you have already submited documents", data: null });
      }
      const answers = await models.questionaire.create(req.body);
      await models.appiontment.findByIdAndUpdate(req.body.appointment, { questionaire: answers?._id })
      return res.json({ status: true, msg: "Documents Created Successfully", data: answers });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  getCollectedQuestioanire: async (req, res) => {
    try {
      let query = {}
      if(req?.user?.role==="patient"){
        console.log("req?.user?.id", req?.user)
        query = {patient:req?.user?.id}
      } else if(req?.user?.role==="doctor"){
        query = {
          doctor:req?.user?.id
        }
      }
      console.log("query", query)
      const getQuestionnaires = await models.questionaire.find(query).populate([
        {
          path: "appointment",
          populate: {
            path: "patient",
            model: "user"
          },
        },
        {
          path: "data.question_id.",
          model: 'question',
        },
        {
          path: "data.answers",
          populate: {
            path: 'answers',
            model: 'answer'
          }
        }
      ]);
      return res.json({ status: true, msg: "All Questionnaire", data: getQuestionnaires })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  getCollectedQuestioanireById: async (req, res) => {
    try {
      const getQuestionaires = await models.questionaire.findById(req.params?.id).populate([
        {
          path: "appointment",
          populate: {
            path: "patient",
            model: "user"
          },
        },
        {
          path: "data.question_id.",
          model: 'question',
        },
        {
          path: "data.answers",
          populate: {
            path: 'answers',
            model: 'answer'
          }
        }
      ]);
      return res.json({ status: true, msg: "Questionaire", data: getQuestionaires })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  saveDoctorChangeQuestionaire: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
      }
      const checkIfAlready = await models.doctorQuestionireChanges.findOne({questionaireId:req.body.questionaireId});
      if(!checkIfAlready){
        const storeDoctorChanges = await models.doctorQuestionireChanges.create(req.body);
        if (storeDoctorChanges) {
          return res.json({ status: true, msg: "Data added successfully", data: storeDoctorChanges })
        }
      }
      else {
        checkIfAlready.data = req.body.data;
        const updateStoreDoctorChanges = await checkIfAlready.save({new:true});
        return res.json({ status: true, msg: "Data updated successfully", data: updateStoreDoctorChanges })

      }
     
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  },
  getVitalsByAppointmentId : async (req, res) => {
    try {
      const getVitals = await models.vitals.findOne({appointment:req.params.id});
      return res.json({ status: true, msg: "Vitals Against Appointment", data: getVitals })
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null })
    }
  }
}
module.exports = answer;

