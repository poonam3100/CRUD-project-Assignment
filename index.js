const express = require("express");
const app = express();
const _PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config();

app.use(morgan("default"));
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/rvsp", (req, res, next) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/", (req, res, next) => {
  return res.status(200).json({
    status: true,
    message: "Hackthon RSVP List API",
  });
});

const db = require("./models");
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

require("./routes/users.routes")(app);

app.listen(_PORT, () => {
  console.log(`App is UP and Running at PORT: ${_PORT}`);
});
