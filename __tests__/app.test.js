const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/");
const connection = require("../db");

beforeEach(() => seed(testData));
afterAll(() => connection.end());

describe("GET /*", () => {
  it("404: responds with a message { error: 'This Path does not exist'}", () => {
    return request(app)
      .get("/hello")
      .expect(404)
      .then(({ body }) => {
        const { error } = body;
        expect(error).toEqual("This Path does not exist");
      });
  });
  it("404: responds with a message { error: 'This Path does not exist'}", () => {
    return request(app)
      .get("/")
      .expect(404)
      .then(({ body }) => {
        const { error } = body;
        expect(error).toEqual("This Path does not exist");
      });
  });
  it("404: responds with a message { error: 'This Path does not exist'}", () => {
    return request(app)
      .get("/categoriess")
      .expect(404)
      .then(({ body }) => {
        const { error } = body;
        expect(error).toBe("This Path does not exist");
      });
  });
});

describe("GET /api/categories", () => {
  it.only("200: responds with an array of all category objects 4, should check if the category object have specific keys", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toHaveProperty("slug");
          expect(category).toHaveProperty("description");
        });
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  it("should return an object of review with specific keys", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toHaveProperty("category");
        expect(review).toHaveProperty("title");
        expect(review).toHaveProperty("review_id");
        expect(review).toHaveProperty("designer");
        expect(review).toHaveProperty("owner");
        expect(review).toHaveProperty("review_body");
        expect(review).toHaveProperty("review_img_url");
        expect(review).toHaveProperty("created_at");
        expect(review).toHaveProperty("votes");
      });
  });

  it("should return an object with the title 'Ultimate Werewolf' from id 3", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review.title).toBe("Ultimate Werewolf");
      });
  });

  it.only("should return an error if no number was provided as a param", () => {
    return request(app)
      .get("/api/reviews/one")
      .expect(404)
      .then((body) => {
        expect(body.error.text).toBe("Please provide an valid ID");
      });
  });

  it.only("should return an error 'Index outOfBound' if index is out of bound", () => {
    return request(app)
      .get("/api/reviews/99999")
      .expect(404)
      .then((body) => {
        expect(body.error.text).toBe("Index outOfBound");
      });
  });
});
