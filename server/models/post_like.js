"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class post_like extends Model {}

    post_like.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { notNull: { msg: "User Id Required" } },
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { notNull: { msg: "Post Id Required" } },
            },
        },
        {
            sequelize,
            modelName: "post_like",
        }
    );
    return post_like;
};
