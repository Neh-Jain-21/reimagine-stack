// PARSE .ENV
require("dotenv").config();

// SERVER CONFIGS
const os = require("os");
const express = require("express");
const cors = require("cors");
const app = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("uploads"));

// MODEL ASSOCIATIONS
require("./utils/associations");

// ROUTES
require("./routes")(app);

// START SERVER
app.listen(process.env.PORT, () => {
    process.stdout.write("\033c");
    console.log("\x1b[32m%s\x1b[0m", "Compiled Successfully!");
    console.log(`\n Local:\t\t   http://localhost:${process.env.PORT}`);
    console.log(
        ` On Your Network:  http://${os.networkInterfaces().enp0s25[0].address}:${process.env.PORT}`
    );
    console.log(`\nCall API in your App\n`);
});
