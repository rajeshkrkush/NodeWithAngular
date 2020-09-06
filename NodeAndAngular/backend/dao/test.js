
'use strict'
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: "test" });

let mysql = require('mysql');
const connectionParam = { host: "localhost", user: "root", password: "root", database: "demoDb" };
//log.info("connectionParam: ", connectionParam);
let connection = mysql.createConnection(connectionParam);


connection.connect();

function createDBObjects() {
    /*let createCustomerPhonetablestmt = `CREATE TABLE IF NOT EXISTS reactDb.custphone(
        id INT NOT NULL,
        phonetype VARCHAR(50),
        phonenumber VARCHAR(50),
        lastUpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP     
    )`*/

    let createUserTableStmt = `CREATE TABLE IF NOT EXISTS demoDb.users (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        password VARCHAR(100),
        lastUpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP     

      )`

    connection.query(createUserTableStmt, [], function (err, rows, fields) {
        if (err) {
            log.error('DB response err is: ', JSON.parse(JSON.stringify(err)));
        }
        if (rows) {
            log.info('user table created. DB response : ', rows);
        }
    });


    let createCatTableStmt = `CREATE TABLE IF NOT EXISTS demoDb.category (
        categoryid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        categoryname VARCHAR(50),
        userid int,
        FOREIGN KEY (userid) REFERENCES users(id),
        lastUpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP     
    
      )`

    connection.query(createCatTableStmt, [], function (err, rows, fields) {
        if (err) {
            log.error('DB response err is: ', JSON.parse(JSON.stringify(err)));
        }
        if (rows) {
            log.info('category table created. DB response : ', rows);
        }
    });

    let createContentTableStmt = `CREATE TABLE IF NOT EXISTS demoDb.content (
            contentid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            contentname VARCHAR(50),
            categoryid int,
            FOREIGN KEY (categoryid) REFERENCES category(categoryid),
            lastUpdatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP     
        
          )`

    connection.query(createContentTableStmt, [], function (err, rows, fields) {
        if (err) {
            log.error('DB response err is: ', JSON.parse(JSON.stringify(err)));
        }
        if (rows) {
            log.info('content table created. DB response : ', rows);
        }
    });
}

createDBObjects();
