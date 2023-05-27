import request from "supertest/esm.js";
import app from "./server.js";
import BlogModel from "./Models/Blog-model.js";

describe("addBlog function", () => {
  it("should add a new blog post to the database", async () => {
    const blogData = {
      title: "Test Blog",
      shortDescription: "This is a test blog",
      fullDescription:
        "This is a test blog post. It is being used for unit testing purposes.",
    };

    const response = await request(app)
      .post("/addBlog")
      .field("title", blogData.title)
      .field("shortDescription", blogData.shortDescription)
      .field("fullDescription", blogData.fullDescription);

    expect(response.status).toBe(200);

    const blogPost = await BlogModel.findOne({ title: blogData.title });

    expect(blogPost.title).toBe(blogData.title);
    expect(blogPost.shortDescription).toBe(blogData.shortDescription);
    expect(blogPost.fullDescription).toBe(blogData.fullDescription);
  });

  it("should return an error if there was a problem saving the blog post", async () => {
    // TODO: implement this test case
  });
});
