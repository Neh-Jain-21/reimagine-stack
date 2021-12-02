const bcrypt = require("bcryptjs");

// responseHandler
const { error, success, fail } = require("../utils/responseHandler");

// Model
const User = require("../models").User;

class UserController {
    async userName(req, res) {
        try {
            // get user
            const user = await User.findOne({
                attributes: ["first_name", "last_name"],
                where: {
                    id: req.id,
                },
            });

            // send user if found
            if (user) {
                success(res, null, user);
            } else {
                fail(res, "User not found, Try Again!", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async getUserDetails(req, res) {
        try {
            // get user
            const user = await User.findOne({
                attributes: ["first_name", "last_name", "email", "phone", "dob", "gender", "image"],
                where: {
                    id: req.id,
                },
            });

            // send user if found
            if (user) {
                success(res, null, {
                    ...user.dataValues,
                    image: `http://${req.hostname}:${process.env.PORT}/users/${user.image}`,
                });
            } else {
                fail(res, "User not found, Try Again!", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async setUserDetails(req, res) {
        try {
            let updatingObject = {};
            const params = req.body;

            updatingObject.first_name = params.first_name;
            updatingObject.last_name = params.last_name;
            updatingObject.phone = params.phone;
            updatingObject.gender = params.gender;
            updatingObject.dob = params.dob;
            if (req.file !== undefined) {
                updatingObject.image = req.file.originalname;
            }

            // find user and update
            const updated = await User.update(updatingObject, {
                where: {
                    id: req.id,
                },
            });

            // send user if found
            if (updated[0] === 1) {
                success(res, "Details Updated", {});
            } else {
                fail(res, "User not found, Try Again!", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async changePassword(req, res) {
        try {
            let encPassword;
            const params = req.body;

            const user = await User.findOne({
                attributes: ["password"],
                where: {
                    id: req.id,
                },
            });

            if (user) {
                // find if old password matches
                if (await bcrypt.compare(params.oldpassword, user.password)) {
                    // encrypt password
                    if (params.newpassword) {
                        encPassword = await bcrypt.hash(params.newpassword, 8);
                    }

                    // update to new password
                    const updated = await User.update(
                        { password: encPassword },
                        { where: { id: req.id } }
                    );

                    // check if password updated
                    if (updated[0] === 1) {
                        success(res, "Password Updated", {});
                    } else {
                        fail(res, "Something went wrong, Try Again!", {});
                    }
                } else {
                    fail(res, "Incorrect Old Password", {});
                }
            } else {
                fail(res, "User not found! Please Login again", {});
            }
        } catch (err) {
            error(res, err);
        }
    }
}

module.exports = UserController;
