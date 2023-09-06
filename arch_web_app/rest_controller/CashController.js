const express = require("express");
const router = express.Router();

// Services
const {getCashBalance} = require("../services/DailyClosingCashService");

router
    .get("/getCashBalance", async (request, response) => {
        try {
            let requestBody = request.query;
            requestBody.userId = request.session.passport.user["ID"];
            let cashBalance = await getCashBalance(requestBody);
            if (cashBalance == undefined) {
                cashBalance = {
                    "Amount": 0
                };
            }
            response.status(200).send({ "message": "successful","data": cashBalance });
        } catch (error) {
            response.status(500).send(new Error({ "message": "error", "error-code": error.message }));
        }
    })

module.exports = router;