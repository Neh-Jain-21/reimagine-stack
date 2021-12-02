// responseHandler
const { error, success, fail } = require("../utils/responseHandler");

// Model
const User = require("../models").User;
const Post = require("../models").Post;
const Post_Media = require("../models").post_media;
const Post_Likes = require("../models").post_like;

class AuthController {
    async createPost(req, res) {
        try {
            const params = req.body;

            // create post
            const post = await Post.create({ user_id: req.id, description: params.description });

            // send fail msg
            if (!post) {
                fail(res, "Something Went Wrong", {});
            } else {
                const mediaArray = req.files.map((file) => {
                    return {
                        post_id: post.id,
                        type: file.mimetype.includes("image") ? "image" : "video",
                        media: file.filename,
                    };
                });

                // create medias
                const postCreated = await Post_Media.bulkCreate(mediaArray);

                if (postCreated) {
                    success(res, null, postCreated);
                } else {
                    fail(res, "Something Went Wrong", {});
                }
            }
        } catch (err) {
            error(res, err);
        }
    }

    async getPost(req, res) {
        try {
            const posts = await Post.findAll({
                attributes: ["id", "createdAt", "description"],
                include: [
                    {
                        model: User,
                        attributes: ["first_name", "last_name", "image"],
                    },
                    {
                        model: Post_Media,
                        attributes: ["type", "media"],
                    },
                ],
            });

            posts.map((post) => {
                post.User.image = `http://${req.hostname}:${process.env.PORT}/users/${post.User.image}`;
                post.post_media.map((media) => {
                    media.media = `http://${req.hostname}:${process.env.PORT}/media/${media.media}`;
                });
            });

            if (posts) {
                success(res, null, posts);
            } else {
                fail(res, "Something Went Wrong", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async getLikes(req, res) {
        try {
            console.log(req.params.id);
            const posts = await Post_Likes.findAll({
                where: {
                    post_id: req.params.id,
                },
                attributes: ["id"],
                include: [
                    {
                        model: User,
                        attributes: ["first_name", "last_name", "image"],
                    },
                ],
            });

            posts.map((post) => {
                post.User.image = `http://${req.hostname}:${process.env.PORT}/users/${post.User.image}`;
            });

            if (posts) {
                success(res, null, posts);
            } else {
                fail(res, "Something Went Wrong", {});
            }
        } catch (err) {
            error(res, err);
        }
    }

    async likePost(req, res) {
        try {
            const postAlreadyLiked = await Post_Likes.findOne({
                where: {
                    post_id: req.body.id,
                    user_id: req.id,
                },
            });

            if (postAlreadyLiked) {
                const postUnLiked = await Post_Likes.destroy({
                    where: {
                        post_id: req.body.id,
                        user_id: req.id,
                    },
                });

                if (postUnLiked) {
                    success(res, "Post Unliked!", {});
                } else {
                    fail(res, "Something Went Wrong", {});
                }
            } else {
                const postLiked = await Post_Likes.create({
                    post_id: req.body.id,
                    user_id: req.id,
                });

                if (postLiked) {
                    success(res, "Liked!", {});
                } else {
                    fail(res, "Something Went Wrong", {});
                }
            }
        } catch (err) {
            error(res, err);
        }
    }
}

module.exports = AuthController;
