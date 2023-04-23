const express = require("express");
const router = express.Router();
const { getCreditReason } = require("../services/CreditReasonService");
const { addCreditDetails, getCreditDetailsByuserId, getCashCreditDetailsByUserId } = require("../services/CreditServices");
const { prepareLendToData, getLendToData } = require("../services/MoneyLendService");

router
    .get("/getCreditReason", async (request, response) => {
        try {
            let reasonData = await getCreditReason(request.session.passport.user["ID"]);
            console.log(reasonData);
            response.status(200).send({ "message": "success", "data": reasonData });
        } catch (error) {
            console.log(error);
            response.status(500).send({ "message": "error", "errorData": error.message });
        }


    })
    .post("/addCredit", async (request, response) => {
        try {
            request.body.userId = request.session.passport.user["ID"];
            await addCreditDetails(request.body);
            response.status(200).send({ "message": "success" });
        } catch (error) {
            console.log(error);
            response.status(500).send({ "message": "error", "errorData": error.message });
        }

    })
    .get("/getLendToPersons", async (request, response) => {
        try {
            let lendToData = await prepareLendToData(request.session.passport.user["ID"]);
            response.status(200).send({ "message": "success", "data": lendToData });
        } catch (error) {
            console.log(error);
            response.status(500).send({ "message": "error", "errorData": error.message });
        }
    })
    .get("/getCredit", async (request, response) => {
        try {
            let requestObj = request.query;
            requestObj.userId = request.session.passport.user["ID"];
            let creditData = await getCreditDetailsByuserId(requestObj);
            response.status(200).send({ "message": "success", "data": creditData });
        } catch (error) {
            response.status(500).send({ "message": "error", "errorData": error.message });
        }

    })
    .get("/getCashCredit", async (request, response) => {
        let requestObj = request.query;
        requestObj.userId = request.session.passport.user["ID"];
        let cashCreditData = await getCashCreditDetailsByUserId(requestObj);
        // let creditData = await getCreditDetailsByuserId(requestObj);
        response.status(200).send({ "message": "success", "data": cashCreditData });
    })
    .get("/getMoneyOwe", async (request, response) => {
        try {
            let oweData = await getLendToData(request.session.passport.user["ID"])
            response.status(200).send({ "message": "success", "data": oweData });
        } catch (error) {
            console.log(error)
            response.status(500).send({ "message": "error", "errorData": error.message });
        }
    });

module.exports = router;