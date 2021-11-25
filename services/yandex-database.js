const { getEnv } = require('../helper/environment');
const AWS = require('aws-sdk');

const accessKeyId = getEnv('SERVICE_ACCOUNT_ACCESS_KEY_ID');
const accessKey = getEnv('SERVICE_ACCOUNT_ACCESS_KEY');
const entryPoint = getEnv('Y_DB_ENDPOINT');

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: accessKey,
  region: 'ru-central1',
  endpoint: entryPoint,
});

class YandexDatabase {
  client;
  dynamodb;

  constructor() {
    this.client = new AWS.DynamoDB.DocumentClient();
    this.dynamodb = new AWS.DynamoDB();
  }

  async createTable(tableName, keySchema, attributes) {
    const params = {
      TableName: tableName,
      KeySchema: keySchema,
      AttributeDefinitions: attributes,
    };

    return this.dynamodb.createTable(params).promise();
  }

  async createItem(tableName, data) {
    const params = {
      TableName: tableName,
      Item: data,
    };

    return this.client.put(params).promise();
  }

  async getItems(tableName) {
    const params = {
      TableName: tableName
    };

    return this.client.scan(params).promise();
  }
}

module.exports = YandexDatabase;
