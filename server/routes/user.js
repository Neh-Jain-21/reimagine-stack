const router = require("express").Router();

// auth middleware
const verifyToken = require("../middleware/verifyToken");
// multer upload
const upload = require("../middleware/multerStorage");

// CONTROLLERS
const UserController = new (require("../controllers/user"))();

// ROUTES
router.route("/username").get(verifyToken, UserController.userName);

router.route("/user").get(verifyToken, UserController.getUserDetails);

router
    .route("/user")
    .post(verifyToken, upload("uploads/users").single("image"), UserController.setUserDetails);

router.route("/change-password").post(verifyToken, UserController.changePassword);

module.exports = router;
