const auth = {};
const models = require("../../../../models/");
const { APIResponse, randomNumber } = require("../../../../helper/");
const { validationResult } = require("express-validator");
const { sendMails } = require("../../../../common/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
auth.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        validation: true,
        msg: "Validation Failed",
        data: errors.array(),
      });
    }
    // finding user
    const User = await models.user.findOne({ email: req.body.email }).populate('clinicId');
    if (User) {
      const password = await bcrypt.compare(req.body.password, User.password);
      if (password) {
        const payLoad = {
          id: User._id,
          email: User.email,
          role: User.role,
          firstName: User.firstName,
          lastName: User.lastName,
          address: User?.address,
          licenseNumber: User?.licenseNumber,
          phoneNumber: User?.phoneNumber,
          clinicId: User?.clinicId?._id,
          clinicName: User?.clinicId?.name,
        };
        const token = jwt?.sign(payLoad, process.env.SECRETE, {
          expiresIn: "24h",
        });
        return res.json({
          status: true,
          msg: "Login Successfully",
          data: token,
        });
      }
      return res
        .status(400)
        .json({ status: false, msg: "Invalid Credentials", data: null });
    }
    return res
      .status(400)
      .json({ status: false, msg: "Invalid Credentials", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: error.message, data: null });
  }
};

auth.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.password = await auth.generatePaassword(req.body.password);
    const User = await models.user.create(req.body);
    if (User) {
      return res
        .status(200)
        .json({ status: false, msg: "User Created Successfully", data: User });
    }
    return res
      .status(400)
      .json({ status: false, msg: "Invalid Credentials", data: null });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, msg: error.message, data: null });
  }
};

auth.generatePaassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
};

auth.forget = {
  changePassword: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = await models.user.findOne({ email: req.body.email });
    if (!email) {
      return custom.APIResponse("Email Not Found", null, false, 404);
    }
    if (!(req.body.resetCode.toString() === email.resetCode.toString())) {
      return APIResponse("Invalid Code", null, res, false, 401);
    }
    // hashing Password
    const newPassword = await auth.generatePaassword(req.body.password);
    email.password = newPassword;
    const updatedPassworc = await email.save({ new: true });
    return APIResponse("Password Updated Successfully", updatedPassworc, res);
  },
  sendMail: async (req, res) => {
    const email = await models.user.findOne({ email: req.body.email });
    if (!email) {
      return APIResponse("Email Not Found", null, res, false, 404);
    }
    // hashing Password
    const code = randomNumber(2000, 300000);
    email.resetCode = code;
    const updateCode = await email.save({ new: true });
    if (!updateCode) {
      return APIResponse(
        "Something Went Wrong, Try Again",
        res,
        null,
        false,
        500
      );
    }
    return APIResponse("Email is send, Please check you mail", code, res);
  },
};

auth.verify = async (req, res) => {
  return custom.APIResponse("Token is verified :)", req.headers.authorization);
};

module.exports = auth;
