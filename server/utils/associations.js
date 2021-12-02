// Model
const User = require("../models").User;
const Post = require("../models").Post;
const Post_Media = require("../models").post_media;
const Post_Likes = require("../models").post_like;

// ------------ User ------------
// Table associations
User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
User.hasMany(Post_Likes, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
// belongs

// ------------ Posts ------------
// Table associations
Post.hasMany(Post_Media, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Post.hasMany(Post_Likes, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
// belongs
Post.belongsTo(User, { foreignKey: "user_id" });

// ------------ post_media ------------
// Table associations
// belongs
Post_Media.belongsTo(Post, { foreignKey: "post_id" });

// ------------ post_likes ------------
// Table associations
// belongs
Post_Likes.belongsTo(Post, { foreignKey: "post_id" });
Post_Likes.belongsTo(User, { foreignKey: "user_id" });
