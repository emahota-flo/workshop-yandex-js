const YandexDatabase = require('../../services/yandex-database');
const { getEnv } = require('../../helper/environment');
const { successResponse, failedResponse } = require('../../helper/response');

module.exports.createTable = async (event, context) => {
  console.log('createTable: ', event);
  try {
    const yandexDatabase = new YandexDatabase();
    const response = await yandexDatabase.createTable(
      getEnv('FILES_TABLE_NAME'),
      [
        { AttributeName: 'fileName', KeyType: 'HASH' },
      ],
      [
        { AttributeName: 'fileName', AttributeType: 'S' },
        { AttributeName: 'fileType', AttributeType: 'S' }
      ]
    );

    return successResponse(response);
  } catch (error) {
    return failedResponse(error);
  }
};

module.exports.createItem = async (event, context) => {
  console.log('createItem: ', event);
  try {
    const { fileName, fileType } = JSON.parse(event.body);
    const yandexDatabase = new YandexDatabase();

    const response = await yandexDatabase.createItem(
      getEnv('FILES_TABLE_NAME'),
      { fileName: fileName, fileType: fileType }
    );

    return successResponse(response);
  } catch (error) {
    return failedResponse(error);
  }
};

module.exports.getItems = async (event, context) => {
  console.log('getItems: ', event);
  try {
    const yandexDatabase = new YandexDatabase();
    const response = await yandexDatabase.getItems(getEnv('FILES_TABLE_NAME'));

    return successResponse(response);
  } catch (error) {
    return failedResponse(error);
  }
};
