const express = require("express");
const router = express.Router();
const {addBankDetails} = require("../services/BankServices");

router.post("/addDetails", async function (req, res) {
    // console.log(req.body);
    let bankDetailsObject = {
        "bankNmae": req.body.bank_name,
        "bankBalance": req.body.bank_balance,
        "notes": req.body.notes
    };
    try{
        await addBankDetails(bankDetailsObject);
        res.status(200).send("Data Saved Successfully");
    }catch (error){
        console.log(error.message);
        res.status(500).send(new Error("Duplicate entry for Bank ID"));
    }
});

module.exports = router;