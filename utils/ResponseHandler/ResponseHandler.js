


const ResponseHandler = (res, statusCode, data = {}, message = "") => {
  return res.status(statusCode).json({
    success: true,
    error: false,
    message,
    data,
  });
};

export default ResponseHandler;
