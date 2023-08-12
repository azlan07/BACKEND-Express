/** Destruct environment variable to get database configuration */
const { DB_USERNAME = 'root', DB_PASSWORD = '', DB_HOST = 'localhost', DB_NAME = 'test' } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: 'mysql',
  },
};
