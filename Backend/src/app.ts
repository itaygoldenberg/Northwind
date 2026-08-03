import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import { saver } from "smart-saver";
import { productController } from "./controllers/product-controller";
import { userController } from "./controllers/user-controller";
import { errorMiddleware } from "./middleware/error-middleware";
import { securityMiddleware } from "./middleware/security-middleware";
import { appConfig } from "./utils/app-config";

class App {

    public start(): void {

        // Configure smart-saver - images path:
        saver.config(path.join(__dirname, "assets", "images"));

        // Create our server object:
        const server = express();

        // System middleware:
        securityMiddleware.registerRateLimit(server);
        server.use(cors()); // Enable CORS.
        server.use(express.json()); // Configure express to create request.body from a given JSON.
        server.use(expressFileUpload()); // Configure express to create request.files from the request.

        // Register "before" middleware: 
        // server.use(loggerMiddleware.logToConsole);
        server.use(securityMiddleware.preventXss);
        server.use(securityMiddleware.blackList);

        // Register controllers:
        server.use(userController.router);
        server.use(productController.router);

        // Register "after" middleware:
        server.use(errorMiddleware.routeNotFound);
        server.use(errorMiddleware.catchAll);

        // Run server:
        server.listen(appConfig.port, () => console.log("Listening..."));
    }

}

const app = new App();
app.start();

// taskkill /F /IM node.exe
