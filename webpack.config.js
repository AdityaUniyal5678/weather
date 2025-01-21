const webpack = require('webpack');
const dotenv = require('dotenv');

// Load env file
const env = dotenv.config({ path: './.env' }).parsed;

// Inject env variables into the build
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'window.process': {
        env: JSON.stringify({
          APP_ID: env.APP_ID,
          API_KEY: env.API_KEY,
          AUTH_DOMAIN: env.AUTH_DOMAIN,
          PROJECT_ID: env.PROJECT_ID,
          STORAGE_BUCKET: env.STORAGE_BUCKET,
          MESSAGING_SENDER_ID: env.MESSAGING_SENDER_ID,
          DATABASE_URL: env.DATABASE_URL,
        }),
      },
    }),
  ],
};
