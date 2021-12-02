"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class post_media extends Model {}

    post_media.init(
        {
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { notNull: { msg: "Post Id Required" } },
            },
            media: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notNull: { msg: "Media Required" } },
            },
            type: {
                type: DataTypes.ENUM(["image", "video"]),
                allowNull: false,
                validate: { notNull: { msg: "Type Required" } },
            },
        },
        {
            sequelize,
            modelName: "post_media",
        }
    );
    return post_media;
};
