
'use strict'
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: "contentdao" });

let mysql = require('mysql');
const connectionParam = { host: "localhost", user: "root", password: "root", database: "demoDb" };
//log.info("connectionParam: ", connectionParam);

async function insertDataIntoContent(data) {
    var connection = mysql.createConnection(connectionParam);
    connection.connect();
    let insertStmt = 'INSERT INTO content(contentname,password) VALUES(?, ?)';
}