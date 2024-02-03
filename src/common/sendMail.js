const sendMail = {}
const AWS = require('aws-sdk');
const awsConfig = {
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
    region:"eu-west-1"
  }
const SES = new AWS.SES(awsConfig);
sendMail.aws = async (data)=>{
   const email = process.env.email;
   const params = {
    Source:email, 
    Destination:{
        ToAddress:[data?.email]
    },
    Message:{
        Subject:{
            Charset:'utf-8',
            Data:data.subject
        }
    },
    Body:{
        Hhtml:{
            Charset:'utf-8',
            Data:data.body
        }
    }
   }
   const sendMail = SES.sendMail(params).promise();
   sendMail.then(()=>{
    return data;
   }).catch((err)=>{
    return err
   })

}

module.exports = sendMail;