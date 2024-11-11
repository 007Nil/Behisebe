import { CreditModel, ExpenseModel, LendMoneyModel, MoneyBorrowModel, MoneyRepayModel } from "../model";
import { getBorrowMoneyCreditDetails } from "../repository/CreditDetailsRepo";
import { getLendMoneyExpenseDetails } from "../repository/ExpenseDetailsRepo";
import { getFundDetailsById } from "../repository/FundDetailsRepo";
import { addLendMoneyDetails, getLendMoneyByExpenseId } from "../repository/LendMoneyRepo";
import { addBorrowMoneyDetails, getBorrowMoneyByCreditId } from "../repository/MoneyBorrowRepo";
import { saveCreditDetailsService } from "./CreditDetailsServices";
import { saveExpenseDetailsService } from "./ExpenseDetailsServices";
import { getPersonDetailsByIdService } from "./PersonDetailsServices";

async function getMoneyRepayDetailsService(repayType: string): Promise<MoneyRepayModel[]> {
    const returnData: MoneyRepayModel[] = [];
    if (repayType === "getLendInfo") {
        const lendMoneyExpenseDetails: ExpenseModel[] = await getLendMoneyExpenseDetails();
        const validLendMoneyExpenseDetails: ExpenseModel[] = []
        for (const eachExpense of lendMoneyExpenseDetails) {
            const lendMoneyDetails: LendMoneyModel[] = await getLendMoneyByExpenseId(eachExpense.expense_id);
            let totalPaidAmount = 0;
            for (const eachLendMoney of lendMoneyDetails) {
                totalPaidAmount = totalPaidAmount + eachLendMoney.paid_amount
            }
            if (totalPaidAmount != eachExpense.amount) {
                validLendMoneyExpenseDetails.push(eachExpense);
            }
        }
        for (const eachLendExpense of validLendMoneyExpenseDetails) {

            const personDetails = await getPersonDetailsByIdService(eachLendExpense.person_id_fk);
            const fundDetails = await getFundDetailsById(eachLendExpense.fund_id_fk);
            const lendMoneyDetails: LendMoneyModel[] = await getLendMoneyByExpenseId(eachLendExpense.expense_id);
            let totalPaidAmount = 0;
            for (const eachLendMoney of lendMoneyDetails) {
                totalPaidAmount = totalPaidAmount + eachLendMoney.paid_amount
            }
            let eachObj: MoneyRepayModel = {
                expense_id: eachLendExpense.expense_id,
                credit_id: null,
                amount: eachLendExpense.amount,
                paid_amount: totalPaidAmount,
                transaction_fund_id: -1,
                date: eachLendExpense.timestamp,
                fundName: fundDetails.fund_name,
                personName: personDetails.person_name,
                message: eachLendExpense.message
            }
            returnData.push(eachObj);
        }
        return returnData;
    } else if (repayType === "getBorrowInfo") {
        const moneyBorrowDetails: CreditModel[] = await getBorrowMoneyCreditDetails();
        const validBorrowMonetDetails: CreditModel[] = [];
        for (const eachCredit of moneyBorrowDetails) {
            const borrowMoneyDetails: MoneyBorrowModel[] = await getBorrowMoneyByCreditId(eachCredit.credit_id);
            let totalPaidAmount = 0;
            for (const eachBorrowMoney of borrowMoneyDetails) {
                totalPaidAmount = totalPaidAmount + eachBorrowMoney.paid_amount
            }
            if (totalPaidAmount != eachCredit.amount) {
                validBorrowMonetDetails.push(eachCredit);
            }
        }
        for (const eachborrowMoney of validBorrowMonetDetails) {

            const personDetails = await getPersonDetailsByIdService(eachborrowMoney.person_id_fk);
            const fundDetails = await getFundDetailsById(eachborrowMoney.fund_id_fk);
            const borrowMoneyDetails: MoneyBorrowModel[] = await getBorrowMoneyByCreditId(eachborrowMoney.credit_id);
            let totalPaidAmount = 0;
            for (const eachBorrowMoney of borrowMoneyDetails) {
                totalPaidAmount = totalPaidAmount + eachBorrowMoney.paid_amount
            }
            let eachObj: MoneyRepayModel = {
                expense_id: null,
                credit_id: eachborrowMoney.credit_id,
                amount: eachborrowMoney.amount,
                paid_amount: totalPaidAmount,
                transaction_fund_id: -1,
                date: eachborrowMoney.timestamp,
                fundName: fundDetails.fund_name,
                personName: personDetails.person_name,
                message: eachborrowMoney.message
            }
            returnData.push(eachObj);
        }
        return returnData;
    }
}

/*
I lend money to someone. Now, that person is giving me money back
It could be a partial payment or full payment
*/
async function updateLendMoneyDetailsService(moneyRepayObj: MoneyRepayModel, operationMode: string) {
    if (operationMode === "getLendInfo") {
        // Save the credits
        let creditObj: CreditModel = {
            amount: moneyRepayObj.paid_amount,
            credit_reason_id_fk: 3,
            fund_id_fk: moneyRepayObj.transaction_fund_id,
            message: "Payment from " + moneyRepayObj.personName,
            timestamp: "",
        }
        saveCreditDetailsService(creditObj);
        // Save date to money_lends
        let lendMoneyObj: LendMoneyModel = {
            expense_id_fk: moneyRepayObj.expense_id,
            paid_amount: moneyRepayObj.paid_amount
        }
        savelendMoneDetails(lendMoneyObj);
    }else if (operationMode === "getBorrowInfo"){
        // Save the expense
        let expenseObj : ExpenseModel ={
            amount: moneyRepayObj.paid_amount,
            expense_reason_id_fk: 3,
            fund_id_fk: moneyRepayObj.transaction_fund_id,
            message: "Payment to " + moneyRepayObj.personName,
            timestamp: ""
        }

        await saveExpenseDetailsService(expenseObj);

        let borrorMoneyObj : MoneyBorrowModel ={
            credit_id_fk: moneyRepayObj.credit_id,
            paid_amount: moneyRepayObj.paid_amount
        }

        await saveBorrowMoneyDetails(borrorMoneyObj);
    }
}

async function saveBorrowMoneyDetails(borrowObj:MoneyBorrowModel) {
    await addBorrowMoneyDetails(borrowObj);
}

async function savelendMoneDetails(lendMoneyObj: LendMoneyModel) {
    await addLendMoneyDetails(lendMoneyObj);
}

export {
    getMoneyRepayDetailsService,
    updateLendMoneyDetailsService
}