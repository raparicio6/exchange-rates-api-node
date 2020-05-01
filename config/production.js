exports.config = {
  environment: 'production',
  isProduction: true,
  common: {
    database: {
      name: process.env.DB_NAME
    }
  }
};
