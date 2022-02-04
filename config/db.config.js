// module.exports = {
//   HOST: process.env.MYSQL_HOST || "localhost",
//   USER: process.env.MYSQL_USER || "root",
//   PASSWORD: process.env.MYSQL_PASS || "",
//   DB: process.env.MYSQL_DB || "dapi_assg_db",
//   dialect: "mysql",
//   PORT: process.env.MYSQL_PORT || 3306,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
module.exports = {
  HOST: process.env.MYSQL_HOST || "localhost",
  USER: process.env.MYSQL_USER || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "",
  DB: process.env.MYSQL_DATABASE || "dapi_assg_db",
  dialect: "mysql",
  PORT: process.env.MYSQL_PORT || 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
