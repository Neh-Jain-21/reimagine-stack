module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to " + process.env.PROJECT_NAME);
    });

    app.use("/auth", require("./auth"));
    app.use("/user", require("./user"));
    app.use("/post", require("./post"));
    // app.use("/admin", require("./Admin"));
    // app.use("/workout", require("./workout"));
};
