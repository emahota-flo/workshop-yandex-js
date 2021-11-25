require('dotenv').config();

const envs = {
  SERVICE_ACCOUNT_NAME: process.env.SERVICE_ACCOUNT_NAME,
  Y_DB_ENDPOINT: process.env.Y_DB_ENDPOINT,
  FILES_TABLE_NAME: process.env.FILES_TABLE_NAME,
  SERVICE_ACCOUNT_ACCESS_KEY_ID: process.env.SERVICE_ACCOUNT_ACCESS_KEY_ID,
  SERVICE_ACCOUNT_ACCESS_KEY: process.env.SERVICE_ACCOUNT_ACCESS_KEY,
  BUCKET_NAME: process.env.BUCKET_NAME,
};

module.exports.getEnv = (name) => {
  const v = envs[name] || process.env[name];

  if (!v) {
    throw new Error(`Missing environment variable ${name}`);
  }

  return v;
}
