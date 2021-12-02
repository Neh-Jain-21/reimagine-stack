"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("post_media", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            post_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            media: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            type: {
                allowNull: false,
                type: Sequelize.ENUM(["image", "video"]),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("post_media");
    },
};
