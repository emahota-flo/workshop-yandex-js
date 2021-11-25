const S3 = require('aws-sdk/clients/s3');
const { getEnv } = require('../helper/environment');

class YandexStorage {
  constructor() {
    this.s3 = new S3({
      endpoint: 'https://storage.yandexcloud.net',
      accessKeyId: getEnv('SERVICE_ACCOUNT_ACCESS_KEY_ID'),
      secretAccessKey: getEnv('SERVICE_ACCOUNT_ACCESS_KEY'),
      region: 'ru-central1',
      httpOptions: {
        timeout: 10000,
        connectTimeout: 10000
      },
    });
  }

  async uploadFile(bucketName, fileName, body) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: body
    };
    return this.s3.upload(params).promise();
  }
}

module.exports = YandexStorage;
