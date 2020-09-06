
'use strict'
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: "userdao" });

let mysql = require('mysql');
const connectionParam = { host: "localhost", user: "root", password: "root", database: "demoDb" };
//log.info("connectionParam: ", connectionParam);



async function insertUserData(username, password) {
    var connection = mysql.createConnection(connectionParam);
    connection.connect();
    let insertStmt = 'INSERT INTO users(name,password) VALUES(?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(insertStmt, [username, password], function (err, rows, fields) {
            if (err) {
                log.error('insertUserData :: DB response err is: ', JSON.stringify(err));
                reject(err);
                connection.end();
            }
            if (rows) {
                log.info('insertUserData :: Inserted %s records.', rows.affectedRows);
                resolve(rows.affectedRows);
                connection.end();
            }
        });
    });
}

async function verifyUserData(username, password) {
    var connection = mysql.createConnection(connectionParam);
    let selectStmt = `SELECT id,name,password FROM users where name=?`;
    return new Promise((resolve, reject) => {
        connection.query(selectStmt, [username], function (err, rows, fields) {
            if (err) {
                log.error('verifyUserData :: DB response err is: ', JSON.stringify(err));
                reject(err);
                connection.end();
            }
            if (rows[0]) {
                log.info('verifyUserData :: DB response is: ', rows[0]);
                resolve(rows[0]);
                connection.end();
            } else {
                log.info('verifyUserData :: No data found for : %s', username);
                resolve(null);
                connection.end();
            }
        });
    });
}

async function getUserData(username) {
    var connection = mysql.createConnection(connectionParam);
    let selectStmt = `SELECT id,name,password FROM users where name=?`;
    return new Promise((resolve, reject) => {
        connection.query(selectStmt, [username], function (err, rows, fields) {
            if (err) {
                log.error('getUserData :: DB response err is: ', JSON.stringify(err));
                reject(err);
                connection.end();
            }
            if (rows[0]) {
                log.info('getUserData :: DB response is: ', rows[0]);
                resolve(rows[0]);
                connection.end();
            } else {
                log.info('getUserData :: No data found for : %s', username);
                resolve(null);
                connection.end();
            }
        });
    });
}

module.exports = {
    insertUserData: insertUserData,
    verifyUserData: verifyUserData,
    getUserData: getUserData
}