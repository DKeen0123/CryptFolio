const { BACKEND_URL } = process.env;

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: BACKEND_URL
  };
};