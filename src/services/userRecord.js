const models = require('../models/');
const { APIResponse } = require('../helper/');

const userRecordObj = {
  add: async (req, res, model, msg) => {
    try {
      console.log(req.body);
      console.log('model', model);

      // check if user has userRecord
      const userRecord = await model.findOne({ userId: req.user.id });
      console.log('userRecord', userRecord);
      if (userRecord) {
        // check if userRecord already contains question
        const existingQuestionIds = userRecord.record.map((record) =>
          record.questionId.toString(),
        );
        console.log('existingQuestionIds', existingQuestionIds);

        const newRecords = req.body.record.filter(
          (record) => !existingQuestionIds.includes(record.questionId),
        );
        console.log('newRecords', newRecords);

        // if newRecords is empty
        if (newRecords.length === 0) {
          return APIResponse(
            'You have already attempted this question',
            null,
            res,
            false,
            400,
          );
        }
        userRecord.record.push(...newRecords);
        const updatedData = await userRecord.save({ new: true });
        return APIResponse(`${msg} Updated`, updatedData, res);
      }

      const newData = await model.create(req.body);
      if (newData) {
        return APIResponse(`New ${msg} Added`, newData, res);
      }
      return APIResponse(
        'Something Went Wrong, Try again',
        null,
        res,
        false,
        500,
      );
    } catch (error) {
      return APIResponse(
        'Something Went Wrong',
        error.message,
        res,
        false,
        500,
      );
    }
  },
  getUserRecord: async (req, res, model, msg) => {
    try {
      const paginateOptions = {
        populate: {
          path: 'record',
          populate: [
            { path: 'questionId' },
            {
              path: 'answer',
              model: 'option',
            },
          ],
        },
      };
      const newData = await model.paginate(
        {},
        {
          limit: req.query.limit ? req.query.limit : 10,
          page: req.query.page ? req.query.page : 1,
          ...paginateOptions,
        },
      );

      if (newData.docs.length > 0) {
        return APIResponse(`All ${msg}`, newData, res);
      }
      return APIResponse(`${msg} Not Found`, null, res, false, 404);
    } catch (error) {
      return APIResponse(
        'Something Went Wrong',
        error.message,
        res,
        false,
        500,
      );
    }
  },
};

module.exports = userRecordObj;
