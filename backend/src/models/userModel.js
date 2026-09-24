const db=require("../config/db");


async function getAllUsers(){
    const [rows]=await db.promise().query(
        "SELECT * FROM users"
    );
    return rows;
}
module.exports={
    getAllUsers
};