const express = require("express");
const router = express.Router();
const { getPersonDataByUserId } = require("../services/PersonService");

router.get("/getPersonData", async (request, response) => {
    try {
        let result = await getPersonDataByUserId(request.session.user["ID"]);
        // console.log(result);
        response.status(200).send({ "message": "Success", "data": result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send(new Error("Duplicate entry for Bank ID"));
    }

})

module.exports = router;