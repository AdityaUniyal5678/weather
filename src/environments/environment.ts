declare global {
  interface Window {
    process: {
      env: {
        APP_ID: string;
        API_KEY: string;
        AUTH_DOMAIN: string;
        PROJECT_ID: string;
        STORAGE_BUCKET: string;
        MESSAGING_SENDER_ID: string;
        DATABASE_URL: string;
      };
    };
  }
}

export const environment = {
  production: false,
  appID: window.process?.env?.APP_ID ?? '',
  config: {
    apiKey: window.process?.env?.API_KEY ?? '',
    authDomain: window.process?.env?.AUTH_DOMAIN ?? '',
    projectId: window.process?.env?.PROJECT_ID ?? '',
    storageBucket: window.process?.env?.STORAGE_BUCKET ?? '',
    messagingSenderId: window.process?.env?.MESSAGING_SENDER_ID ?? '',
    databaseURL: window.process?.env?.DATABASE_URL ?? '',
  },
};
