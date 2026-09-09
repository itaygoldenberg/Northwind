import { Express, NextFunction, Request, Response } from "express";
import expressRateLimit from "express-rate-limit";
import striptags from "striptags";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { cyber } from "../utils/cyber";
import helmet from "helmet";

class SecurityMiddleware {

    // Short Circuit Middleware:
    public blackList(request: Request, response: Response, next: NextFunction): void {
        const denyIpAddresses = ["11.22.33.44", "100.200.3.5"];
        const userIp = request.ip?.toString()!;
        if (denyIpAddresses.includes(userIp)) {
            const message = "You are black listed!";
            response.status(StatusCode.Forbidden).json({ message });
        }
        else {
            next();
        }
    }

    // Verify logged-in:
    public verifyLoggedIn(request: Request, response: Response, next: NextFunction): void {

        // Extract token: 
        const authorization = request.headers.authorization; // "Bearer the-token..."
        const token = authorization?.substring(7);

        // If token is legal:
        if (cyber.verifyToken(token!)) {
            next();
        }
        else {
            const err = new ClientError(StatusCode.Unauthorized, "You are not logged in.");
            next(err); // Go to catchAll middleware.
        }
    }

    // Verify admin:
    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {

        // Extract token: 
        const authorization = request.headers.authorization; // "Bearer the-token..."
        const token = authorization?.substring(7);

        // If token is legal and user is admin:
        if (cyber.verifyAdmin(token!)) {
            next();
        }
        else {
            const err = new ClientError(StatusCode.Forbidden, "You are not authorized.");
            next(err); // Go to catchAll middleware.
        }
    }

    // Prevent XSS attack:
    public preventXss(request: Request, response: Response, next: NextFunction): void {

        // Run on body object:
        for (const prop in request.body) {

            // Take prop value: 
            const value = request.body[prop];

            // If string: 
            if (typeof value === "string") {

                // Remove tags:
                request.body[prop] = striptags(value);
            }
        }

        // Continue:
        next();
    }

    // Prevent DoS attack:
    public registerRateLimit(server: Express): void {

        // Any route that serves images. One page shows many of them at once,
        // so 5 requests per second would block the page from ever loading.
        const imageRoutes = ["/api/products/images/", "/api/employees/images/"];

        // General rate-limit:
        server.use(expressRateLimit({
            windowMs: 1000, // Time window in milliseconds.
            limit: 20, // How many requests allowed in that window.
            skip: (request: Request) => imageRoutes.some(route => request.path.startsWith(route)) // Skip when requesting images
        }));

        // Images rate-limit:
        imageRoutes.forEach(route => server.use(route, expressRateLimit({ // Only images.
            windowMs: 1000, // Time window in milliseconds.
            limit: 200, // How many requests allowed in that window.
        })));
    }

    // Use helmet to protect header attacks: 
    public headerProtection(server: Express): void {
        server.use(helmet({
            // The client is served from a different port, and on a bare IP the browser
            // does not treat that as the same site - "same-site" made every image fail
            // with ERR_BLOCKED_BY_RESPONSE.NotSameSite once deployed. These images are
            // public and already served without a token, so cross-origin is correct here.
            crossOriginResourcePolicy: { policy: "cross-origin" }
        }));
    }

}

export const securityMiddleware = new SecurityMiddleware();
