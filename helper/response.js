function successResponse(response) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: response,
  };
}

function failedResponse(error) {
  console.log('error: ', error);
  return {
    statusCode: 500,
    headers: {
      'Content-Type': 'application/json',
    },
    body: error,
  };
}

module.exports = {
  successResponse,
  failedResponse
};
