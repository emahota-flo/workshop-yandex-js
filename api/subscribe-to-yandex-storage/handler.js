const YandexDatabase = require('../../services/yandex-database');
const { getEnv } = require('../../helper/environment');


module.exports.subscribeToStorage = async (event, context) => {
  console.log('subscribeToStorage', JSON.stringify(event));
  try {
    const yandexDatabase = new YandexDatabase();

    await Promise.all(event.messages.map(async ({ details }) => {
      const { object_id } = details;

      await yandexDatabase.createItem(
        getEnv('FILES_TABLE_NAME'),
        { fileName: object_id, fileType: 'text/txt' }
      );
    }));


  } catch (error) {
    console.log('subscribeToStorage error: ', error);
  }
}
