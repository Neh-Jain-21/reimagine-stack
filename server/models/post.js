"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {}

    Post.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { notNull: { msg: "User Id Required" } },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: { notNull: { msg: "Description Required" } },
            },
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
