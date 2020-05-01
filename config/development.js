exports.config = {
  environment: 'development',
  isDevelopment: true,
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    }
  }
};
