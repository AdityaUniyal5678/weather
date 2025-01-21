declare namespace NodeJS {
  interface ProcessEnv {
    APP_ID: string;
    API_KEY: string;
    AUTH_DOMAIN: string;
    PROJECT_ID: string;
    STORAGE_BUCKET: string;
    MESSAGING_SENDER_ID: string;
    DATABASE_URL: string;
  }
}
