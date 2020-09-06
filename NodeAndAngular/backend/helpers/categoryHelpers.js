'use strict'
const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: "categoryHelper" });
const userProfile = require('./userProfile');
const categoryData = require('./../dao/categorydao');

//call dao for inserting
async function insertCatIntoDb(categoryname) {
    let userId = await userProfile.getUserId();
    console.log("userId ", userId);
    let effectedRow = await categoryData.insertDataIntoCategory(categoryname, userId);
    if (effectedRow > 0) {
        return true;
    } else return false

}

async function getCatfromDb() {
    let category = await categoryData.getDataFromCategory();
    if (category != null && category != undefined) {
        let returnCategory = []
        category.forEach(element => {
            returnCategory.push({ id: element.categoryid, value: element.categoryname })
        });
        return returnCategory
    } else return false;
}

module.exports = {
    insertCatIntoDb: insertCatIntoDb,
    getCatfromDb: getCatfromDb
}