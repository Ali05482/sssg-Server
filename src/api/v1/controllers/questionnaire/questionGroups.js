const models = require("../../../../models");
const { validationResult } = require("express-validator");
const services = require("../../../../services");
const questionGroups = {
  add: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, msg: "Invalid Inputs, Please make sure you are filling every feild", data: errors.array() });
    }
    const checkFolder = await models.questionFolder.findById(req.body.questionFolderId);
    if (!checkFolder) {
      return res.json({ status: false, msg: "Sorry this folder does not exists, please create one first", data: null });
    }
    const addGroup = await models.questionGroup.create(req.body);
    if (!addGroup) {
      return res.json({ status: false, msg: "Something Went Wrong, Try again......", data: null });
    }
    await models.questionFolder.findByIdAndUpdate(checkFolder._id, { $push: { questionGroupId: addGroup._id } })
    return res.json({ status: true, msg: "Question group created successfully", data: addGroup });
  },
  edit: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to edit", param: "id" }],
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.edit(
      req,
      res,
      models.questionGroup,
      "Question group"
    );
  },
  getAll: async (req, res) => {
    try {
      const folders = await models.questionGroup.find();
      return res.json({ status: true, msg: "All Question Group", data: folders })
    } catch (error) {
      return res.status(500).json({ status: true, msg: "Something Went Wrong", data: null })
    }
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
      models.questionGroup,
      "Question Group"
    );
  },
  getQuestionsAndAnswersByGroupId: async (req, res) => {
    try {
      const data = await models.questionGroup.findById(req.params.id)
        .populate({
          path: "questionId",
          populate: {
            path: 'answers',
            model: 'answer',
            populate: {
              path: 'linkedQuestion.questionId',
              model: 'question',
              populate: {
                path: 'answers',
                model: 'answer',
                populate: {
                  path: 'linkedQuestion.questionId',
                  model: 'question',
                  populate: {
                    path: 'answers',
                    model: 'answer',
                    populate: {
                      path: 'linkedQuestion.questionId',
                      model: 'question',
                      populate: {
                        path: 'answers',
                        model: 'answer',
                        populate: {
                          path: 'linkedQuestion.questionId',
                          model: 'question',
                          populate: {
                            path: 'answers',
                            model: 'answer',
                            populate: {
                              path: 'linkedQuestion.questionId',
                              model: 'question',
                              populate: {
                                path: 'answers',
                                model: 'answer',
                                populate: {
                                  path: 'linkedQuestion.questionId',
                                  model: 'question',
                                  populate: {
                                    path: 'answers',
                                    model: 'answer',
                                    populate: {
                                      path: 'linkedQuestion.questionId',
                                      model: 'question',
                                      populate: {
                                        path: 'answers',
                                        model: 'answer',
                                        populate: {
                                          path: 'linkedQuestion.questionId',
                                          model: 'question',
                                          populate: {
                                            path: 'answers',
                                            model: 'answer',
                                            populate: {
                                              path: 'linkedQuestion.questionId',
                                              model: 'question',
                                              populate: {
                                                path: 'answers',
                                                model: 'answer',
                                                populate: {
                                                  path: 'linkedQuestion.questionId',
                                                  model: 'question',
                                                  populate: {
                                                    path: 'answers',
                                                    model: 'answer',
                                                    populate: {
                                                      path: 'linkedQuestion.questionId',
                                                      model: 'question',
                                                      populate: {
                                                        path: 'answers',
                                                        model: 'answer',
                                                        populate: {
                                                          path: 'linkedQuestion.questionId',
                                                          model: 'question',
                                                          populate: {
                                                            path: 'answers',
                                                            model: 'answer',
                                                            populate: {
                                                              path: 'linkedQuestion.questionId',
                                                              model: 'question',
                                                              populate: {
                                                                path: 'answers',
                                                                model: 'answer',
                                                                populate: {
                                                                  path: 'linkedQuestion.questionId',
                                                                  model: 'question',
                                                                  populate: {
                                                                    path: 'answers',
                                                                    model: 'answer',
                                                                    populate: {
                                                                      path: 'linkedQuestion.questionId',
                                                                      model: 'question',
                                                                      populate: {
                                                                        path: 'answers',
                                                                        model: 'answer',
                                                                        populate: {
                                                                          path: 'linkedQuestion.questionId',
                                                                          model: 'question',
                                                                          populate: {
                                                                            path: 'answers',
                                                                            model: 'answer',
                                                                            populate: {
                                                                              path: 'linkedQuestion.questionId',
                                                                              model: 'question',
                                                                              populate: {
                                                                                path: 'answers',
                                                                                model: 'answer',
                                                                                populate: {
                                                                                  path: 'linkedQuestion.questionId',
                                                                                  model: 'question',
                                                                                  populate: {
                                                                                    path: 'answers',
                                                                                    model: 'answer',
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }

                  }
                }
              }
            }
          }
        }).lean()
      return res.json({ status: true, msg: "Data Fetched", data });
    } catch (error) {
      return res.json({ status: false, msg: "Error", data: error.message });
    }
  },
  getAllByFolderId: async (req, res) => {
    try {
      const totalGroups = await models.questionGroup.find({ questionFolderId: req.params.id });
      return res.json({ status: true, msg: "Groups according to folder id", data: totalGroups });
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Something Went Wrong", data: null });
    }
  },
  deleteById: async (req, res) => {
    // Check if ID parameter is missing in the request
    if (!req.params.id) {
      return res.status(400).json({
        errors: [{ msg: "ID is required to delete", param: "id" }],
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await services.generator.deleteById(
      req,
      res,
      models.questionGroup,
      "Question Group"
    );
  },
  getQuestionGroupById : async (req,res) =>{
    try {
      const questionGroup = await models.questionGroup.findById(req.params.id);
      return res.json({status:true,msg:"Question Group Fetched",data:questionGroup});
    } catch (error) {
      return res.status(400).json({status:false,msg:"Something Went Wrong",data:error.message});
    }
  }
}
module.exports = questionGroups;

