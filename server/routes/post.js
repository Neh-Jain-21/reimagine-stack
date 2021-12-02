const router = require("express").Router();

// auth middleware
const verifyToken = require("../middleware/verifyToken");
// multer upload
const upload = require("../middleware/multerStorage");

// CONTROLLERS
const PostController = new (require("../controllers/post"))();

// ROUTES
router
    .route("/post")
    .post(verifyToken, upload("uploads/media").array("media"), PostController.createPost);

router.route("/post").get(verifyToken, PostController.getPost);

router.route("/like/:id").get(verifyToken, PostController.getLikes);

router.route("/like").post(verifyToken, PostController.likePost);

module.exports = router;
