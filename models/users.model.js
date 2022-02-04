module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users_tbl", {
        firstName: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(800),
            allowNull: false
        }
    });

    return User;
};