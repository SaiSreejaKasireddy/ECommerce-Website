const app = require("./app");
const db = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT;

async function startServer() {
    try {
        const connection = await db.promise().getConnection();

        console.log("MySQL connected successfully");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("MySql connection failed:", error.message);
    }
}

startServer();