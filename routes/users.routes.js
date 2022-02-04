module.exports = app => {
    const user = require("../controllers/users.controller");

    var router = require("express").Router();

    router.post('/signup', user.createUser)
    router.post('/signin', user.signinUser)
    router.get('/', user.getAllUsers)
    

    app.use('/api/user', router);
};