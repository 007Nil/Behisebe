const express = require("express");
const router = express.Router();
const { addBankDetails, fetchBankDetails, getAccountType } = require("../services/BankServices");

router.post("/addDetails",async function (req, res) {
    // console.log(req.body);
    // req.session.userData[0]["ID"];
    let bankDetailsObject = {
        "bankName": req.body.bank_name,
        "bankBalance": req.body.bank_balance,
        "bankAccountType": req.body.bankAccountType,
        "notes": req.body.notes,
        "userID": req.session.userData["ID"]
    };
    // console.log(req.session.userData["ID"])
    try {
        await addBankDetails(bankDetailsObject);
        // console.log("HIt")
        res.status(200).send({"message":"Data Saved Successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(new Error("Duplicate entry for Bank ID"));
    }
});

router.get("/getBankDetails", async (request, response) => {
    try {
        let bankDetails = await fetchBankDetails(request.session.userData["ID"]);
        response.status(200).send(bankDetails);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(new Error("Unablle to fetch Bank details. 500 Server Error!!!"));
    }

})

router.get("/getAccountTypes", async (request,response) => {
    try{
        let accountTypes = await getAccountType();
        console.log(accountTypes);
        response.status(200).send(accountTypes);
    }catch (error){
        console.log(error.message)
        res.status(500).send(new Error("Unablle to fetch Account Type details. 500 Server Error!!!"));
    }
})

module.exports = router;