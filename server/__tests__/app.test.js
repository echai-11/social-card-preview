import app from "../app";
import request from "supertest";

describe("Test the root path", () => {
  test("return home path", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
describe("Test /url post method", () => {
  test("returns url with meta tags", (done) => {
    request(app)
      .post("/url")
      .send({ url: "https://www.nytimes.com/marketing/cooking/app" })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  test("returns bad url", (done) => {
    request(app)
      .post("/url")
      .send({ url: "www.google.com" })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
