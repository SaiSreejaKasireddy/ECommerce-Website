const request =require("supertest");
const app=require("../app");
const db=require("../src/config/db");
describe("Users API",()=>{
    test("GET /api/users should return all users",async () => {

        const response = await request(app)
    .get("/api/users");
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
});
afterAll(async () => {
    await db.promise().query(
        "DELETE FROM users WHERE email = ?",
        ["jesttest@test.com"]
    );

    await db.promise().end();
});


test("GET /api/users/:id should return a user", async () => {

    const response = await request(app)
        .get("/api/users/21");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(21);

});

test("GET /api/users/:id  return 404 user not existed",async()=>{
    const response=await request(app)
    .get("/api/users/9999");
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found");
});


test("GET /api/users/email/:email should be return", async()=>{
    const response=await request(app)
    .get("/api/users/email/rahul@test.com");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe("rahul@test.com");
    expect(response.body.data.password).toBeUndefined();
}); 



//post

test("POST /api/users should create a new user",async()=>{
    const newUser={
        first_name:"Jest",
        last_name:"test",
        email:"jesttest@test.com",
        password:"Test@1234",
        phone:9999999999
    };
    const response=await request(app)
    .post("/api/users").send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.userId).toBeDefined();

});
test("POST /api/users should return 409 duplicate user",async()=>{
    const duplicateUser={
        first_name:"Duplicate",
        last_name:"Test",
        email:"jesttest@test.com",
        password:"test@1234",
        phone:"9999999998"

    };
    const response=await request(app).
    post("/api/users").send(duplicateUser);
    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email already registered");
});
test("POST /api/users should return 400 for missing required fields", async () => {
    const invalidUser = {
        first_name: "Test",
        last_name: "User",
        email: "missing@test.com"
    };

    const response = await request(app)
        .post("/api/users")
        .send(invalidUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("All requirements were not entered..");
});

test("POST /api/users should return 400 for invalid email", async () => {
    const invalidUser = {
        first_name: "Test",
        last_name: "User",
        email: "invalidemail",
        password: "Test@1234",
        phone: "9999999996"
    };

    const response = await request(app)
        .post("/api/users")
        .send(invalidUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Enter proper email format");
});

test("POST /api/users should return 400 for short password", async () => {
    const invalidUser = {
        first_name: "Test",
        last_name: "User",
        email: "shortpassword@test.com",
        password: "1234",
        phone: "9999999995"
    };

    const response = await request(app)
        .post("/api/users")
        .send(invalidUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
        "Enter password whose length is greater than 8"
    );
});


//put

test("PUT /api/users/:id should update the users",async()=>{
    const response=await request(app).put("/api/users/21")
    .send({
        first_name:"Rahul Updated",
        last_name:"Sharma",
        email:"rahul@test.com",
        phone:"9999999999"
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User updated successfully");
});
test("PUT /api/users/:id should return non existing user",async()=>{
    const response=await request(app)
    .put("/api/users/9999").send({
        first_name:"Test",
        last_name:"User",
        email:"nonexistinguser@test.com",
        phone:9999999999
    });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found");
});
test("PUT /api/users/:id should return 409 for duplicate email", async () => {
    const response = await request(app)
        .put("/api/users/21")
        .send({
            first_name: "Rahul Updated",
            last_name: "Sharma",
            email: "priya@test.com",
            phone: "9999999999"
        });

    expect(response.statusCode).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email already registered");
});
test("PUT /api/users/:id should return 400 for invalid update data", async () => {
    const response = await request(app)
        .put("/api/users/21")
        .send({
            first_name: "Rahul Updated"
        });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
        "First name,last name and email are required"
    );
});
//delete
test("DELETE /api/users/:id should delete the user", async () => {

    // Create a temporary user for deletion
    const newUser = {
        first_name: "Delete",
        last_name: "Test",
        email: "deletetest@test.com",
        password: "Test@1234",
        phone: "9999999997"
    };

    const createResponse = await request(app)
        .post("/api/users")
        .send(newUser);

    expect(createResponse.statusCode).toBe(201);

    const userId = createResponse.body.userId;

    // Delete the temporary user
    const deleteResponse = await request(app)
        .delete(`/api/users/${userId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.success).toBe(true);
    expect(deleteResponse.body.message).toBe("deleted successfully");
});
test("DELETE /api/users/:id should return 404 for non-existent user", async () => {
    const response = await request(app)
        .delete("/api/users/9999");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found");
});
});




