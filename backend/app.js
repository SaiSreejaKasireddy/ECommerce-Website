const express=require("express");
const userRoutes=require("./src/routes/userRoutes");
const categoryRoutes=require("./src/routes/categoryRoutes");
const errorHandler=require("./src/middleware/errorMiddleware");
const app=express();
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/categories",categoryRoutes);
app.get("/api/health",(req,res)=>{
    res.json({
        success:true,
        message:"Ecommerce website is running successfully"
    });
});
app.use(errorHandler);
module.exports=app;