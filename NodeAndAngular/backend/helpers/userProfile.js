"use stric"

const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: "userdao" });
const userData = require('./../dao/usersdao');

let userId = "";
async function checkForUser(username, password) {
    let userInfo = await userData.getUserData(username);
    console.log("useinfo", userInfo)
    if (userInfo != null && userInfo.name != "" && userInfo.name != undefined) {
        if (userInfo.password == password) {
            setUserId(userInfo.id);
            console.log("get userId", getUserId())
            return true;
        }
    } else {
        return false;
    }
}

//inserting user to db for signup
async function insertUserToDB(username, password) {
    let effectedRow = await userData.insertUserData(username, password);
    if (effectedRow > 0) {
        return true;
    } else return false

}

function setUserId(val) {
    userId = val;
}

function getUserId() {
    return userId;
}

module.exports = {
    checkForUser: checkForUser,
    insertUserToDB: insertUserToDB,
    setUserId: setUserId,
    getUserId: getUserId
}