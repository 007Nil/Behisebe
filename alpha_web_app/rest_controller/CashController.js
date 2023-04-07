const express = require("express");
const router = express.Router();

router
    .get("/getCashBalance", async (request, response) => {
        try {
            console.log("HIT");
            response.status(200).send({ "message": "successful" });
        } catch (error) {
            response.status(500).send(new Error({ "message": "error", "error-code": error.message }));
        }
    })

module.exports = router;