import { CreditModel, ExpenseModel, LendMoneyModel, MoneyBorrowModel, MoneyRepayModel } from "../model";
import { getLendMoneyExpenseDetails } from "../repository/ExpenseDetailsRepo";
import { getFundDetailsById } from "../repository/FundDetailsRepo";
import { addLendMoneyDetails, getLendMoneyByExpenseId } from "../repository/LendMoneyRepo";
import { saveCreditDetailsService } from "./CreditDetailsServices";
import { getPersonDetailsByIdService } from "./PersonDetailsServices";

async function getMoneyRepayDetailsService(repayType: string): Promise<MoneyRepayModel[]> {
    const returnData: MoneyRepayModel[] = [];
    if (repayType === "getLendInfo") {
        const lendMoneyExpenseDetails: ExpenseModel[] = await getLendMoneyExpenseDetails();
        const validLendMoneyExpenseDetails: ExpenseModel[] = []
        for (const eachExpense of lendMoneyExpenseDetails) {
            const lendMoneyDetails: LendMoneyModel[] = await  getLendMoneyByExpenseId(eachExpense.expense_id);
            let totalPaidAmount = 0;
            for (const eachLendMoney of lendMoneyDetails){
                totalPaidAmount = totalPaidAmount + eachLendMoney.paid_amount
            }
            if (totalPaidAmount != eachExpense.amount){
                validLendMoneyExpenseDetails.push(eachExpense);
            }
        }
        for (const eachLendExpense of validLendMoneyExpenseDetails) {

            const personDetails = await getPersonDetailsByIdService(eachLendExpense.person_id_fk);
            const fundDetails = await getFundDetailsById(eachLendExpense.fund_id_fk);
            const lendMoneyDetails: LendMoneyModel[] = await  getLendMoneyByExpenseId(eachLendExpense.expense_id);
            let totalPaidAmount = 0;
            for (const eachLendMoney of lendMoneyDetails){
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
    }
}

/*
I lend money to someone. Now, that person is giving me money back
It could be a partial payment or full payment
*/
async function updateLendMoneyDetailsService(moneyRepayObj: MoneyRepayModel){

    // Save the credits
    let creditObj :  CreditModel = {
        amount: moneyRepayObj.paid_amount,
        credit_reason_id_fk: 3,
        fund_id_fk: moneyRepayObj.transaction_fund_id,
        message: "Payment from "+moneyRepayObj.personName
    }
    saveCreditDetailsService(creditObj);
    // Save date to money_lends
    let lendMoneyObj: LendMoneyModel = {
        expense_id_fk: moneyRepayObj.expense_id,
        paid_amount: moneyRepayObj.paid_amount
    }
    savelendMoneDetails(lendMoneyObj);
}

async function savelendMoneDetails(lendMoneyObj:LendMoneyModel) {
    await addLendMoneyDetails(lendMoneyObj);
}

export {
    getMoneyRepayDetailsService,
    updateLendMoneyDetailsService
}