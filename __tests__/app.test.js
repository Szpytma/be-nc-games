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
  it("200: responds with an array of all category objects 4, should check if the category object have specific keys", () => {
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

describe("GET /api/reviews", () => {
  it("200: responds with an array of all 13 reviews objects, should check if the reviews object have specific keys", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toHaveLength(13);
        reviews.forEach((review) => {
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("review_body", expect.any(String));
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
        });
      });
  });
  it("200: responds with an sorted array of all reviews objects by by date in descending order.", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("created_at", {
          descending: true,
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
        expect(review.category).toBe("euro game");
        expect(review.title).toBe("Agricola");
        expect(review.review_id).toBe(1);
        expect(review.designer).toBe("Uwe Rosenberg");
        expect(review.owner).toBe("mallionaire");
        expect(review.review_body).toBe("Farmyard fun!");
      });
  });

  it("should return an object with the title 'Ultimate Werewolf' from id 3", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review.title).toBe("Ultimate Werewolf");
        expect(review.review_id).toBe(3);
        expect(review.review_body).toBe("We couldn't find the werewolf!");
      });
  });

  it("should return an error if no number was provided as a param", () => {
    return request(app)
      .get("/api/reviews/one")

      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please provide an valid ID");
      });
  });

  it("should return an error 'Index outOfBound' if index is out of bound", () => {
    return request(app)
      .get("/api/reviews/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Index outOfBound");
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  it("200: responds with an array of comments object sorted by created_at with specific keys", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        console.log(body.comments);
        expect(body.comments).toBeSortedBy("created_at", {
          descending: true,
        });
        expect(body.comments).toHaveLength(3);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            review_id: 2,
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
          });
        });
      });
  });

  it("400: responds with an error when review_id is invalid  ", () => {
    return request(app)
      .get("/api/reviews/two/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Please provide an valid ID");
      });
  });

  it("404: responds with an error when review_id valid but not found", () => {
    return request(app)
      .get("/api/reviews/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Index outOfBound");
      });
  });

  it("200: when the review exists, but has no comments (status 200)", () => {});
});
