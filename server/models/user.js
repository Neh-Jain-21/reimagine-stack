/** @format */

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
        {
            first_name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: { notNull: { msg: "First Name Required" } },
            },
            last_name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: { notNull: { msg: "Last Name Required" } },
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: { name: true, msg: "Email Already Registered" },
                validate: {
                    isEmail: { msg: "Bad Email Format" },
                    notNull: { msg: "Email Required" },
                },
            },
            phone: {
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: { name: true, msg: "Phone No. Already Registered" },
                validate: {
                    len: {
                        args: [10, 10],
                        msg: "10 Digits Phone No. Required",
                    },
                    notNull: { msg: "Phone Required" },
                },
            },
            password: {
                type: DataTypes.STRING(250),
                allowNull: false,
                validate: { notNull: { msg: "Password Required" } },
            },
            dob: {
                type: DataTypes.STRING(70),
                allowNull: false,
                validate: { notNull: { msg: "DOB Required" } },
            },
            gender: {
                type: DataTypes.ENUM(["male", "female"]),
                allowNull: false,
                validate: { notNull: { msg: "Gender Required" } },
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notNull: { msg: "Image Required" } },
            },
            token: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
            otp: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
            // virtual data which is not in DB
            fullName: {
                type: DataTypes.VIRTUAL,
                get() {
                    // const firstName = this.getDataValue(firstName);
                    // const lastName = this.getDataValue(lastName);
                    return this.first_name + " " + this.last_name;
                },
                set(value) {
                    throw new Error("Don't set full name value");
                },
            },
        },
        {
            sequelize,
            modelName: "User",
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );

    return User;
};
