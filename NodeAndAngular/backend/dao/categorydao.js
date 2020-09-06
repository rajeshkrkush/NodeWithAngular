
'use strict'
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: "categorydao" });

let mysql = require('mysql');
const connectionParam = { host: "localhost", user: "root", password: "root", database: "demoDb" };
//log.info("connectionParam: ", connectionParam);

async function insertDataIntoCategory(categoryname, userid) {
    var connection = mysql.createConnection(connectionParam);
    connection.connect();
    var connection = mysql.createConnection(connectionParam);
    connection.connect();
    let insertStmt = 'INSERT INTO category(categoryname,userid) VALUES(?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(insertStmt, [categoryname, userid], function (err, rows, fields) {
            if (err) {
                log.error('insertDataIntoCategory :: DB response err is: ', JSON.stringify(err));
                reject(err);
                connection.end();
            }
            if (rows) {
                log.info('insertDataIntoCategory :: Inserted %s records.', rows.affectedRows);
                resolve(rows.affectedRows);
                connection.end();
            }
        });
    });
}

async function getDataFromCategory() {
    var connection = mysql.createConnection(connectionParam);
    connection.connect();
    var connection = mysql.createConnection(connectionParam);
    connection.connect();
    let selectStmt = `SELECT categoryid,categoryname FROM category`;
    return new Promise((resolve, reject) => {
        connection.query(selectStmt, [], function (err, rows, fields) {
            if (err) {
                log.error('getDataFromCategory :: DB response err is: ', JSON.stringify(err));
                reject(err);
                connection.end();
            }
            if (rows) {
                log.info('getDataFromCategory :: DB response is: ', rows);
                resolve(rows);
                connection.end();
            } else {
                log.info('getDataFromCategory :: No data found for : %s');
                resolve(null);
                connection.end();
            }
        });
    });
}

module.exports = {
    insertDataIntoCategory: insertDataIntoCategory,
    getDataFromCategory: getDataFromCategory
}