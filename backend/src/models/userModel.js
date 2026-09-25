const con=require("../config/db");


async function getAllUsers(){
    const [rows]=await con.promise().query(
        "SELECT * FROM users"
    );
    return rows;
}
async function getUserById(id){
    const [rows]=await con.promise().query(
        "SELECT * FROM users WHERE id =?",
        [id]
    );
    return rows[0];
}

// insert values(), update table set parameter where condition , delete table where condition

module.exports={
    getAllUsers,
    getUserById
};