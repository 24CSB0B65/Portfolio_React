process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";

const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/models");

let authToken; // shared across describe blocks, set once login succeeds

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth", () => {
  const user = { username: "tester", email: "tester@example.com", password: "TestPass123" };
  let token;

  it("rejects registration with invalid input", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "a", email: "bad", password: "123" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("registers a new user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.status).toBe(201);
    expect(res.body.data.user.email).toBe(user.email);
    expect(res.body.data.token).toBeDefined();
  });

  it("rejects duplicate registration", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.status).toBe(409);
  });

  it("rejects login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "wrong" });
    expect(res.status).toBe(401);
  });

  it("logs in with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: user.password });
    expect(res.status).toBe(200);
    authToken = res.body.data.token;
    expect(authToken).toBeDefined();
  });

  it("rejects /me without a token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("returns the current user with a valid token", async () => {
    const res = await request(app).get("/api/auth/me").set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe(user.email);
  });
});

describe("Projects", () => {
  let projectId;

  it("rejects project creation without auth", async () => {
    const res = await request(app)
      .post("/api/projects")
      .send({ title: "Test", description: "A test project description." });
    expect(res.status).toBe(401);
  });

  it("creates a project when authenticated", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ title: "Test Project", description: "A test project description.", tech: ["Node.js"] });
    expect(res.status).toBe(201);
    expect(res.body.data.tech).toEqual(["Node.js"]);
    projectId = res.body.data.id;
  });

  it("lists projects publicly", async () => {
    const res = await request(app).get("/api/projects");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta.total).toBeGreaterThan(0);
  });

  it("gets a single project publicly", async () => {
    const res = await request(app).get(`/api/projects/${projectId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(projectId);
  });

  it("returns 404 for a missing project", async () => {
    const res = await request(app).get("/api/projects/999999");
    expect(res.status).toBe(404);
  });

  it("updates a project when authenticated", async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ title: "Updated Title" });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("Updated Title");
  });

  it("deletes a project when authenticated", async () => {
    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(204);
  });
});

describe("Messages", () => {
  it("accepts a public contact message", async () => {
    const res = await request(app)
      .post("/api/messages")
      .send({ name: "Jane", email: "jane@example.com", message: "Great work on your site!" });
    expect(res.status).toBe(201);
  });

  it("rejects an invalid contact message", async () => {
    const res = await request(app)
      .post("/api/messages")
      .send({ name: "", email: "bad", message: "hi" });
    expect(res.status).toBe(400);
  });

  it("rejects listing messages without auth", async () => {
    const res = await request(app).get("/api/messages");
    expect(res.status).toBe(401);
  });

  it("lists messages when authenticated as admin", async () => {
    const res = await request(app)
      .get("/api/messages")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.meta.total).toBeGreaterThan(0);
  });
});

describe("Misc", () => {
  it("health check responds ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("ok");
  });

  it("returns a structured 404 for unknown routes", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
