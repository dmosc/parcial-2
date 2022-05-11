const mysql = require("mysql");
const fs = require("fs");
const {databaseKeys} = require("./environment");

// docker run -p 3306:3306 --name nodejs-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=P2_A01229551 -d mysql:5.7
const getDatabase = (database = undefined) => {
  return mysql.createConnection({
    ...databaseKeys,
    database: database ?? databaseKeys.database,
    multipleStatements: true
  });
};

const loadDDLQueries = () => {
  const database = getDatabase();
  const data = fs.readFileSync("data.sql", "utf-8").replace(/[\r\n]/g, "").toString();
  database.query(data);
  database.end();
}

module.exports = {
  getDatabase,
  loadDDLQueries
}