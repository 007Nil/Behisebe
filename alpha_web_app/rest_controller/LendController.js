const express = require("express");
const router = express.Router();


router
    .post("/payDebt", async (request, response) => {
        try {
            let userID = request.session.userData["ID"];
            requestObj = request.body;
            if (requestObj.fullPayment == 1){
                // No partialP
            }
            // let queryData = await fetchExpenseReasonByUserID(userID)
            response.status(200).send({ "message": "Fetch Success", "data": "TEST" })
        } catch (error) {
         
        }

    })

module.exports = router;