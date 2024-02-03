module.exports = (msg, data=null, res, status = true, apiStatus = 200) =>{
     const responseData = {
    status: status,
    msg: msg,
    data: data,
  };

  return res.status(apiStatus).json(responseData);
}