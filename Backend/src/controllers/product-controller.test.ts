import { after, before, describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../app";
import { ProductModel } from "../models/product-model";
import { helper } from "../utils/helper";
import { StatusCode } from "../models/enums";
import path from "path";

describe("ProductController", () => {

    let token: string;
    let adminToken: string;
    const createdProductIds: number[] = [];

    before(async () => {
        await helper.delay(500); // Wait for the server to go live.
        const credentials = { email: "bart@gmail.com", password: "1234" };
        const response = await supertest(app.server).post("/api/login").send(credentials);
        token = response.body;
        const adminCredentials = { email: "itay@test.com", password: "1234" };
        const adminResponse = await supertest(app.server).post("/api/login").send(adminCredentials);
        adminToken = adminResponse.body;
    });

    it("should return product array", async () => {
        const response = await supertest(app.server).get("/api/products");
        const products = response.body as ProductModel[];
        expect(products.length).to.be.greaterThanOrEqual(1);
        expect(products[0]).to.not.be.empty;
    });

    it("should return one product", async () => {
        const response = await supertest(app.server).get("/api/products/1");
        const product = response.body as ProductModel;
        expect(product).to.not.be.empty;
        expect(product).to.contain.keys("id", "name", "price", "stock");
    });

    it("should add a product without an image", async () => {
        const product = { name: "Pizza", price: 100, stock: 200 };
        const response = await supertest(app.server)
            .post("/api/products")
            .auth(token, { type: "bearer" })
            .send(product);
        const dbProduct = response.body as ProductModel;
        expect(dbProduct).to.not.be.empty;
        expect(dbProduct).to.contain.keys("id", "name", "price", "stock");
        expect(response.status).equal(StatusCode.Created);
        createdProductIds.push(dbProduct.id);
    });

    it("should add a product with an image", async () => {
        const imagePath = path.join(__dirname, "..", "assets", "tests", "pizza.jpg");
        const response = await supertest(app.server)
            .post("/api/products")
            .auth(token, { type: "bearer" })
            .field("name", "Pizza")
            .field("price", "100")
            .field("stock", "200")
            .attach("image", imagePath);
        const dbProduct = response.body as ProductModel;
        expect(dbProduct).to.not.be.empty;
        expect(dbProduct).to.contain.keys("id", "name", "price", "stock", "imageUrl");
        expect(dbProduct.name).equal("Pizza");
        expect(response.status).equal(StatusCode.Created);
        createdProductIds.push(dbProduct.id);
    });

    it("should return 404 status on route not found", async () => {
        const response = await supertest(app.server).get("/api/there-is-nothing-here");
        expect(response.status).equal(StatusCode.NotFound);
    });

    it("should return 404 status on resource not found", async () => {
        const response = await supertest(app.server).get("/api/products/999999");
        expect(response.status).equal(StatusCode.NotFound);
    });

    // Runs once after every test in this block. Without it each run leaves
    // two Pizza rows and an uploaded image behind. Deleting the product also
    // deletes its image file, so the assets folder is left clean too.
    after(async () => {
        for (const id of createdProductIds) {
            if (!id) continue; // an add test that failed leaves no id to remove
            await supertest(app.server)
                .delete(`/api/products/${id}`)
                .auth(adminToken, { type: "bearer" });
        }
    });

});
