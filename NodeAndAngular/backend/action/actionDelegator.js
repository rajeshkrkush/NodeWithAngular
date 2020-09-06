"use stric"


const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: "actionDelegator" });
const userInfo = require('./../helpers/userProfile');
const categoryInfo = require('./../helpers/categoryHelpers');
async function actionDelegators(req, res) {
    var data = req.body;
    log.info("post object is: %s", JSON.stringify(data));
    var msgToShow = "";
    //for signup
    if (data.modelId == "100") {
        log.info("post object is: %s", await userInfo.checkForUser(data.username, data.password));
        if (await userInfo.checkForUser(data.username, data.password)) {
            msgToShow = {
                responseCode: 91
            }

        } else {
            if (await userInfo.insertUserToDB(data.username, data.password)) {
                if (!await categoryInfo.getCatfromDb()) {
                    msgToShow = {
                        responseCode: 0,
                        username: data.username,
                        categoriesToShow: categoriesToShow

                    }
                } else {
                    msgToShow = {
                        responseCode: 0,
                        username: data.username
                    }
                }

            } else {
                msgToShow = {
                    responseCode: 91
                }
            }

        }
        return msgToShow;
    }
    //for login
    if (data.modelId == "101") {
        if (await userInfo.checkForUser(data.username, data.password)) {
            let categoriesToShow = await categoryInfo.getCatfromDb();
            if (!categoriesToShow) {

                msgToShow = {
                    responseCode: 0,
                    username: data.username,
                    categoriesToShow: categoriesToShow

                }
            } else {
                msgToShow = {
                    responseCode: 0,
                    username: data.username,

                }
            }


        } else {
            msgToShow = {
                responseCode: 91
            }
        }

        return msgToShow;
    }

    //dashboard for category
    if (data.modelId = "102") {
        if (data.categoryname != null && data.categoryname != "" && data.categoryname != undefined) {

            if (await categoryInfo.insertCatIntoDb(data.categoryname)) {
                let categoriesToShow = await categoryInfo.getCatfromDb();
                msgToShow = {
                    responseCode: 0,
                    categoriesToShow: categoriesToShow
                }
            }
        } else {
            msgToShow = {
                responseCode: 91
            }
        }

        return msgToShow;

    }
    //dashboard for file load
    if (data.modelId == "103") {
        const file = req.body;
        const base64data = file.content.replace(/^data:.*,/, '');
        fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.set('Location', userFiles + file.name);
                res.status(200);
                res.send(file);
            }
        });
    }

    //dashboard for category


}

module.exports = {
    actionDelegators: actionDelegators
}