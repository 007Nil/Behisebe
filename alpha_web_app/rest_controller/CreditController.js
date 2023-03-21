const express = require("express");
const router = express.Router();
const { getCreditReason } = require("../services/CreditReasonService");
const { addCreditDetails } = require("../services/CreditServices");
const { prepareLendToData } = require("../services/MoneyLendService");

router
    .get("/getCreditReason", async (request, response) => {
        try {
            let reasonData = await getCreditReason(request.session.userData["ID"]);
            console.log(reasonData);
            response.status(200).send({ "message": "success", "data": reasonData });
        } catch (error) {
            console.log(error.message);
            response.status(500).send({ "message": "error", "errorData": error.message });
        }


    })
    .post("/addCredit", async (request, response) => {
        try {
            request.body.UserID = request.session.userData["ID"];
            await addCreditDetails(request.body);
            response.status(200).send({ "message": "success" });
        } catch (error) {
            console.log(error.message);
            response.status(500).send({ "message": "error", "errorData": error.message });
        }

    })
    // .get("getCreditInfo", async (request, response) => {
    //     response.status(200).send({ "message": "success" });
    // })
    .get("/getLendToPersons", async (request, response) => {

        let lendToData = await prepareLendToData(request.session.userData["ID"]);
        response.status(200).send({ "message": "success","data": lendToData });
    })

module.exports = router;