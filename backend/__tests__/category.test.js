const request = require("supertest");
const app = require("../app");
const db = require("../src/config/db");

let createdCategoryId;
let updateCategoryId;

test("GET /api/categories should return all the categories", async () => {
    const response = await request(app)
        .get("/api/categories");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
});

test("POST /api/categories should create the new category", async () => {
    const newCategory = {
        name: "Jest Test Category",
        description: "Temporary category created for testing",
    };

    const response = await request(app)
        .post("/api/categories")
        .send(newCategory);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Category created successfully");
    expect(response.body.categoryId).toBeDefined();

    createdCategoryId = response.body.categoryId;
});

test("PUT /api/categories/:id should reject duplicate category name", async () => {
    const newCategory = {
        name: "Jest Update Category",
        description: "Temporary category for update testing"
    };

    const createResponse = await request(app)
        .post("/api/categories")
        .send(newCategory);

    expect(createResponse.statusCode).toBe(201);

    updateCategoryId = createResponse.body.categoryId;

    const duplicateCategory = {
        name: "Electronic Devices",
        description: "Updated description"
    };

    const response = await request(app)
        .put(`/api/categories/${updateCategoryId}`)
        .send(duplicateCategory);

    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Category already exists");
});

test("PUT /api/categories/:id should update the category", async () => {
    const newCategory = {
        name: "Jest Update Success",
        description: "Category for successful update testing"
    };

    const createResponse = await request(app)
        .post("/api/categories")
        .send(newCategory);

    expect(createResponse.statusCode).toBe(201);

    const categoryId = createResponse.body.categoryId;

    const updatedCategory = {
        name: "Jest Updated Category",
        description: "Updated description"
    };

    const response = await request(app)
        .put(`/api/categories/${categoryId}`)
        .send(updatedCategory);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Category updated successfully");

    await db.promise().query(
        "DELETE FROM categories WHERE id = ?",
        [categoryId]
    );
});

test("DELETE /api/categories/:id should delete category",async()=>{
    const response=await request(app)
    .delete("/api/categories/9999");
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Category not found");
});

afterAll(async () => {
    if (createdCategoryId) {
        await db.promise().query(
            "DELETE FROM categories WHERE id = ?",
            [createdCategoryId]
        );
    }

    if (updateCategoryId) {
        await db.promise().query(
            "DELETE FROM categories WHERE id = ?",
            [updateCategoryId]
        );
    }

    await db.promise().end();
});