const db = require("../models");
const Op = db.Sequelize.Op;
const Users = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup New User
exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log(req.body);

    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      firstName == undefined ||
      lastName == undefined ||
      email == undefined ||
      password == undefined
    ) {
      return res.status(500).json({
        status: false,
        message: "All fields are required",
        data: {},
      });
    }

    let condition = { email: email };
    let userExists = await Users.findOne({ where: condition });
    // console.log(userExixts);
    if (userExists)
      return res.status(200).json({
        status: false,
        message: `${email} is already associated with another account. Please try again with new one..`,
        data: {},
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    // Create a User
    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    // Save Tutorial in the database
    Users.create(user)
      .then((data) => {
        res.status(200).json({
          status: true,
          message: "Succesfully Registered..",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          data: {},
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      });

    
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};

// Sigin User
exports.signinUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      email == "" ||
      password == "" ||
      email == undefined ||
      password == undefined
    ) {
      return res.status(500).json({
        status: false,
        message: "All fields are required",
        data: {},
      });
    }

    let condition = { email: email };
    let user = await Users.findOne({ where: condition });

    if (!user)
      return res.status(400).json({
        status: false,
        message: "Invalid Email",
        data: {},
      });

    if (!bcrypt.compareSync(password, user.password))
      return res
        .status(500)
        .json({ status: false, message: "Invalid Password", data: {} });
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET);

    return res
      .status(200)
      .header("auth-token", token)
      .json({
        status: true,
        message: "Login Successful.",
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    let data = await Users.findAll({
      attributes: ["id", "firstName", "lastName","email" ,"createdAt", "updatedAt"],
    });
    if (data) return res.json(data);
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
      data: {},
    });
  }
};
