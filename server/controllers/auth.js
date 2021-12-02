const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// mailer
const mailer = require("../utils/mailer");

// responseHandler
const { error, success, fail } = require("../utils/responseHandler");

// Model
const User = require("../models").User;

class AuthController {
    async register(req, res) {
        try {
            let encPassword;
            const params = req.body;

            // encrypt password
            if (params.password) {
                encPassword = await bcrypt.hash(params.password, 8);
            }

            // create user
            const register = await User.create({
                first_name: params.fname,
                last_name: params.lname,
                email: params.email,
                phone: params.phone,
                password: encPassword,
                dob: params.dob,
                gender: params.gender,
                image: req.file.originalname,
            });

            // send success or fail msg
            if (register) {
                success(res, null, {
                    id: register.id,
                    email: register.email,
                });
            } else {
                fail(res, "Something Went Wrong", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async logIn(req, res) {
        try {
            const params = req.body;

            // find user
            const user = await User.findOne({
                attributes: ["id", "email", "password"],
                where: {
                    email: params.email,
                },
            });

            // send success or fail msg
            if (user) {
                const passwordMatch = await bcrypt.compare(params.password, user.password);

                if (passwordMatch) {
                    const token = await jwt.sign({ id: user.id }, process.env.JWTKEY);

                    await user.update(
                        { token: token },
                        {
                            where: {
                                id: user.id,
                            },
                        }
                    );

                    success(res, null, { token });
                } else {
                    fail(res, "Password Incorrect", {});
                }
            } else {
                fail(res, "User not found", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async forgotPassword(req, res) {
        try {
            const params = req.body;

            // find user
            const user = await User.findOne({
                attributes: ["id", "email"],
                where: {
                    email: params.email,
                },
            });

            // send mail if user found
            if (user) {
                const random = Math.floor(Math.random() * 10000);

                mailer(params.email, "Forgot Password OTP", `Your OTP is ${random}`);

                await User.update({ otp: random }, { where: { email: params.email } });

                success(res, "Mail Sent!", {});
            } else {
                fail(res, "User not found", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async verifyOtp(req, res) {
        try {
            const params = req.body;

            // find otp
            const otpVerified = await User.findOne({
                attributes: ["id", "email"],
                where: {
                    otp: params.otp,
                    email: params.email,
                },
            });

            if (otpVerified) {
                await User.update({ otp: "" }, { where: { email: params.email } });

                success(res, "OTP Verified", {});
            } else {
                fail(res, "Incorrect OTP", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async resetPassword(req, res) {
        try {
            let encPassword;
            const params = req.body;

            // encrypt password
            if (params.password) {
                encPassword = await bcrypt.hash(params.password, 8);
            }

            // change password
            const updated = await User.update(
                { password: encPassword },
                {
                    where: {
                        email: params.email,
                    },
                }
            );

            // check if password updated
            if (updated[0] === 1) {
                success(res, "Password Updated", {});
            } else {
                fail(res, "User not found, Try Again!", {});
            }
        } catch (err) {
            error(res, err);
        }
    }
}

module.exports = AuthController;
