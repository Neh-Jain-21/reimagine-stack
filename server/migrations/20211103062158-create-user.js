/** @format */

"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            dob: {
                type: Sequelize.STRING(70),
                allowNull: false,
            },
            gender: {
                type: Sequelize.ENUM(["male", "female"]),
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null,
            },
            otp: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Users");
    },
};
