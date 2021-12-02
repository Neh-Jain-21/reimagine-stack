const router = require("express").Router();

// multer upload
const upload = require("../middleware/multerStorage");

// CONTROLLERS
const AuthController = new (require("../controllers/auth"))();

// ROUTES
router.route("/register").post(upload("uploads/users").single("image"), AuthController.register);

router.route("/login").post(AuthController.logIn);

router.route("/forgot-password").post(AuthController.forgotPassword);

router.route("/verify-otp").post(AuthController.verifyOtp);

router.route("/reset-password").post(AuthController.resetPassword);

module.exports = router;
