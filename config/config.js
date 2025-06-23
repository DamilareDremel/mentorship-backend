require('dotenv').config(); // 👈 this loads .env variables

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  },
  test: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  }
};
