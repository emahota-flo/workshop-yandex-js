const { failedResponse, successResponse } = require('../../helper/response');
const YandexStorage = require('../../services/yandex-storage');
const { getEnv } = require('../../helper/environment');

module.exports.uploadFile = async (event, context) => {
  console.log('createFile: ', event);
  try {
    const { fileName, fileBody } = JSON.parse(event.body);

    const yandexStorage = new YandexStorage();
    const response = await yandexStorage.uploadFile(getEnv('BUCKET_NAME'), fileName, fileBody);

    return successResponse(response);
  } catch (error) {
    return failedResponse(error);
  }
}
