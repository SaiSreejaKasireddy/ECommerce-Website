const express=require("express");
const db=require("./src/config/db");
const app=express();
app.use(express.json());
const PORT=5000;
async function startServer(){
    try{
        const connection=await db.promise().getConnection();
        console.log("MySQL connected successfully");
        connection.release();
        app.listen(PORT,()=>{
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch(error){
        console.error("MySql connection failed:",error.message);
    }
}
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "E-Commerce API is running"
    });
});

startServer();