const request = require("supertest");
const app = require("../index");

describe("Auth API", () => {
  let testEmail = `test${Date.now()}@mail.com`;

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: testEmail,
        password: "123456",
        role: "mentee"
      });
    expect(res.statusCode).toEqual(201);
  });

  it("should login a user", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: testEmail, // use dynamic email
        password: "123456"
      });
    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty("token");
  });
});
