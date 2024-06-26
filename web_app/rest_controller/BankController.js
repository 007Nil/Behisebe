const express = require("express");
const router = express.Router();
// Services
const { addBankDetails, getUserBankDetails, getAccountType } = require("../services/BankServices");
const { getDailyClosing } = require("../services/DailyClosingService");


router.post("/addDetails", async function (req, res) {
    let requestObj = req.body;
    requestObj.userID = req.session.passport.user["ID"];
    try {
        await addBankDetails(requestObj);
        res.status(200).send({ "message": "Data Saved Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error({ "message": "error", "error-code": error.message }));
    }
});

router.get("/getBankDetails", async (request, response) => {
    try {

        let requestObj = {
            userId: request.session.passport.user["ID"],
            date: request.query.date
        }
        // console.log(request.query);
        let bankDetails = await getUserBankDetails(requestObj);
        console.log("pass")
        response.status(200).send(bankDetails);
        return;
    } catch (error) {
        console.log(error);
        response.status(500).send(new Error("Unablle to fetch Bank details. 500 Server Error!!!"));
        return;
    }

})

router.get("/getAccountTypes", async (request, response) => {
    try {
        let accountTypes = await getAccountType();
        // console.log(accountTypes);
        response.status(200).send(accountTypes);
    } catch (error) {
        console.log(error)
        response.status(500).send(new Error("Unablle to fetch Account Type details. 500 Server Error!!!"));
    }
});

router.get("/getAccountBalance", async (request, response) => {
    try {
        let requestBody = request.query;
        requestBody.userId = request.session.passport.user["ID"];
        let bankAmount = await getDailyClosing(requestBody);
        // console.log(bankAmount);
        response.status(200).send({"message": "successful","data": bankAmount.Amount});
    } catch (error) {
        console.log(error)
        response.status(500).send(new Error("Unablle to fetch Bank balance. 500 Server Error!!!"));
    }
});

module.exports = router;