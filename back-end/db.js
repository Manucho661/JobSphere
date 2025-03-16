const mysql = require("mysql2");

// ✅ Create MySQL Connection Pool
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobsphere"
});

// ✅ Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL");
});

module.exports = db; // ✅ Export DB Connection
