const { response } = require("express");
const express = require("express");
const router = express.Router();
const { getCreditReason } = require("../services/CreditReasonService");
const {addCreditDetails} = require("../services/CreditServices");

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
    // .post("/addCreditReason", async (request, response) => {
    //     console.log(request.body);
    //     response.status(200).send({ "message": "success" });
    // })
    .post("/addCredit", async (request,response) => {
        request.body.UserID = request.session.userData["ID"];
        await addCreditDetails(request.body);
        response.status(200).send({ "message": "success" });
    })

module.exports = router;