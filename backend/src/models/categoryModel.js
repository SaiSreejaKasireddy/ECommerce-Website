const con=require("../config/db");
async function getAllCategories(){
    const [rows]=await con.promise().query(
        "SELECT * FROM categories"
    );
    return rows;
}
module.exports={
    getAllCategories
};