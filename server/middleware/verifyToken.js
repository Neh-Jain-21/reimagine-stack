/** @format */

const jwt = require("jsonwebtoken");
const { sequelize, Sequelize } = require("../models/index");
const { DataTypes } = Sequelize;
const User = require("../models/user")(sequelize, DataTypes);

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["auth-token"];

        if (!token) {
            return res.status(403).send({ message: "Token required for authentication" });
        }

        const decoded = jwt.decode(token);

        if (decoded.id) {
            // get user
            const user = await User.findOne({
                attributes: ["token"],
                where: {
                    id: decoded.id,
                },
            });

            if (user.token === token) {
                req.id = decoded.id;
            } else {
                res.status(401).send({
                    message: "Invalid Token",
                });
            }
        }
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
