const morgan = require("morgan");
const {AllRoutes} = require("./router/router");
const createError = require("http-errors");

module.exports = class Application {
    #express = require("express");
    #app = this.#express();
    constructor(PORT, DB_URL) {
        this.configApplication();
        this.configDatabase(DB_URL);
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();
    }

    configApplication() {
        const path = require("path");
        this.#app.use(morgan("dev"));
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended: true}));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    }

    createServer(PORT) {
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server Run > on http://localhost:${PORT}`);
        });
    }

    configDatabase(DB_URL) {
        const mongoose = require("mongoose");
        mongoose
            .connect(DB_URL)
            .then(() => {
                console.log("connected to mongodb");
            })
            .catch(error => console.log(error));

        mongoose.connection.on("connected", () => {
            console.log("mongo connected to DB");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("mongo connected is disconnected");
        });
        process.on("SIGINT", async () => {
            console.log("disconnected");
            process.exit(0);
        });
    }

    errorHandler() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("آدرس مورد نظر یافت نشد"));
        });
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError();
            const statusCode = error?.status || serverError.status;
            const message = error?.message || serverError.message;
            return res.status(statusCode).json({statusCode, message});
        });
    }

    createRoutes() {
        this.#app.use(AllRoutes);
    }
};
