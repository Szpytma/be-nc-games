const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/");
const connection = require("../db");
const { forEach } = require("../db/data/test-data/categories");
const endpoints = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => connection.end());

describe("GET /*", () => {
  it("404: responds with a message { error: 'This Path does not exist'}", () => {
    return request(app)
      .get("/hello")
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toEqual("This Path does not exist");
      });
  });
  it("404: responds with a message { error: 'This Path does not exist'}", () => {
    return request(app)
      .get("/s")
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toEqual("This Path does not exist");
      });
  });
  it("404: responds with a message { error: 'This Path does not exist'}", () => {
    return request(app)
      .get("/categoriess")
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("This Path does not exist");
      });
  });
});

describe("GET /api", () => {
  it("200; Responds with JSON object containing endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
  it("200; Responds with JSON object containing endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty(["GET /"]);
        expect(body).toHaveProperty(["GET /api"]);
        expect(body).toHaveProperty(["GET /api/categories"]);
        expect(body).toHaveProperty(["GET /api/reviews"]);
        expect(body).toHaveProperty(["GET api/reviews/:review_id/comments"]);
        expect(body).toHaveProperty(["POST api/reviews/:review_id/comments"]);
        expect(body).toHaveProperty(["PATCH /api/reviews/:review_id"]);
        expect(body).toHaveProperty(["DELETE /api/comments/:comment_id"]);
        expect(body).toHaveProperty(["GET /api/users"]);
      });
  });
  it("GET / should return information about Readme.md file", () => {
    expect(endpoints["GET /"].description).toEqual(
      "serves up with a information about Readme.md file"
    );
  });
  it("GET /api should return a json representation of all the available endpoints of the api", () => {
    expect(endpoints["GET /api"].description).toEqual(
      "serves up a json representation of all the available endpoints of the api"
    );
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
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("review_body", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
          expect(review).toHaveProperty("comment_count", expect.any(Number));
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

describe("GET /api/reviews?queries=true", () => {
  it("200: should return reviews based on 'category' value specified in query ", () => {
    return request(app)
      .get("/api/reviews?category=social deduction")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toHaveLength(11);
        reviews.forEach((review) => {
          expect(review.category).toBe("social deduction");
        });
      });
  });
  it("200: should return reviews sorted by title", () => {
    return request(app)
      .get("/api/reviews?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("title", {
          descending: true,
        });
      });
  });

  it("200: should return reviews sorted created_at and ascending based", () => {
    return request(app)
      .get("/api/reviews?order=asc")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("created_at", {
          descending: false,
        });
      });
  });

  it("200: should return reviews sorted by asc votes with category of social deduction", () => {
    return request(app)
      .get("/api/reviews?category=social deduction&sort_by=votes&order=asc")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toHaveLength(11);
        reviews.forEach((review) => {
          expect(review.category).toBe("social deduction");
        });
        expect(reviews).toBeSortedBy("votes", {
          descending: false,
        });
      });
  });

  it("200: should return empty array if category exist ", () => {
    return request(app)
      .get("/api/reviews?category=children's games")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toEqual([]);
      });
  });

  it("404: should return an error message 404 not found if category does not exist ", () => {
    return request(app)
      .get("/api/reviews?category=not_a_category")
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("404 not found");
      });
  });

  it("400: invalid sortBy value should return an error. ", () => {
    return request(app)
      .get("/api/reviews?sort_by=notTitle")
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe(
          "Column does not exist, please sort it with valid column"
        );
      });
  });

  it("400: invalid order value should return an error.", () => {
    return request(app)
      .get("/api/reviews?order=ascdesc")
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toBe("Please use asc or desc for sorting");
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
  it("should return review object with comment_count key", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toHaveProperty("comment_count", expect.any(Number));
      });
  });
  it("should return review id 2 with comment_count key equal to 3", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review.comment_count).toBe(3);
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
        expect(body.message).toBe("Please provide an valid data");
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
        expect(body.message).toBe("Please provide an valid data");
      });
  });

  it("404: responds with an error when review_id valid but not found", () => {
    return request(app)
      .get("/api/reviews/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("review not found");
      });
  });

  it("200: when the review exists, but has no comments (status 200)", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
});
describe("POST /api/reviews/:review_id/comments", () => {
  it("201: responds with posted comment object", () => {
    const commentToPost = {
      username: "bainesface",
      body: "test comment",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(commentToPost)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toEqual({
          comment_id: 7,
          body: "test comment",
          review_id: 1,
          author: "bainesface",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });

  it('404: responds with error message "404 not found if the wrong username was passed"', () => {
    const commentToPost = {
      username: "szpytma",
      body: "test comment",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(commentToPost)
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toEqual("404 not found");
      });
  });

  it('404: responds with error message "404 not found" if we tried to access not existing id', () => {
    const commentToPost = {
      username: "bainesface",
      body: "test comment",
    };
    return request(app)
      .post("/api/reviews/999/comments")
      .send(commentToPost)
      .expect(404)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toEqual("404 not found");
      });
  });

  it('400: responds with error message "400 Please provide an valid data" if we tried to access invalid id ', () => {
    const commentToPost = {
      username: "bainesface",
      body: "test comment",
    };
    return request(app)
      .post("/api/reviews/one/comments")
      .send(commentToPost)
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toEqual("Please provide an valid data");
      });
  });

  it('400: responds with error message "missing body" if we tried to post empty body', () => {
    const commentToPost = {
      username: "bainesface",
      body: "",
    };
    return request(app)
      .post("/api/reviews/one/comments")
      .send(commentToPost)
      .expect(400)
      .then(({ body }) => {
        const { message } = body;
        expect(message).toEqual("Please provide an valid data");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  it("200: responds with the updated object with incremented votes ", () => {
    const patchObj = { inc_votes: 5 };
    return request(app)
      .patch("/api/reviews/1")
      .send(patchObj)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toMatchObject({
          review_id: 1,
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: 6,
        });
      });
  });
  it("404: responds with error if no id was found", () => {
    return request(app)
      .patch("/api/reviews/999")
      .send({ inc_votes: 5 })
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("404 not found");
      });
  });
  it("400: responds with error if wrong data type was provided", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: "five" })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Please provide an valid data");
      });
  });

  it("404: responds with error if  patch object doesn't have required inc_votes key", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send()
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Please provide data");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  it("204: responds with no content ", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  it("404: responds with error if no id was found ", () => {
    return request(app)
      .delete("/api/comments/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("404 not found");
      });
  });

  it("400: responds with error if id is not a number ", () => {
    return request(app)
      .delete("/api/comments/one")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Please provide an valid data");
      });
  });
});

describe("GET /api/users", () => {
  it("200: responds with an array of all users objects 4, should check if the user object have specific keys", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
        });
      });
  });
});
