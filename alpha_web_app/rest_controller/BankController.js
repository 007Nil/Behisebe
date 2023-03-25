const express = require("express");
const router = express.Router();
const { addBankDetails, fetchBankDetails, getAccountType } = require("../services/BankServices");


router.post("/addDetails",async function (req, res) {
    let requestObj = req.body;
    requestObj.userID = req.session.userData["ID"];
    try {
        await addBankDetails(requestObj);
        res.status(200).send({"message":"Data Saved Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error({"message": "error", "error-code": error.message}));
    }
});

router.get("/getBankDetails", async (request, response) => {
    try {
        let bankDetails = await fetchBankDetails(request.session.userData["ID"]);
        response.status(200).send(bankDetails);
    } catch (error) {
        console.log(error);
        response.status(500).send(new Error("Unablle to fetch Bank details. 500 Server Error!!!"));
    }

})

router.get("/getAccountTypes", async (request,response) => {
    try{
        let accountTypes = await getAccountType();
        // console.log(accountTypes);
        response.status(200).send(accountTypes);
    }catch (error){
        console.log(error)
        response.status(500).send(new Error("Unablle to fetch Account Type details. 500 Server Error!!!"));
    }
})

module.exports = router;