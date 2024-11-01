import { SQLiteRunResult } from "expo-sqlite";
import { ExpenseModel, CreditModel, FundDetailsModel, ExpenseReasonModel, CreditReasonModel } from "../model";
import { getExpenseReasonByNameService, saveExpenseDetailsService, } from "./ExpenseDetailsServices";
import { getCreditReasonDetailsByNameService, saveCreditDetailsService } from "./CreditDetailsServices";
import { updateFundBalance, getFundDetailsById } from "../repository/FundDetailsRepo";
import { SelfTransferModel } from "../model";

async function startSelfTransaction(selfTransferObj: SelfTransferModel) {
    let debitedFundId: number = selfTransferObj.transferFromFundId;
    let creditedFundId: number = selfTransferObj.transferToFundId;

    //Save the expense
    let expenseReasonObj: ExpenseReasonModel = await getExpenseReasonByNameService("Self Transfer");
    let expenseObj: ExpenseModel = {
        fund_id_fk: debitedFundId,
        expense_reason_id_fk: expenseReasonObj.expense_reason_id,
        person_id_fk: null,
        amount: selfTransferObj.amount,
        message: selfTransferObj.message
    }
    await saveExpenseDetailsService(expenseObj);

    // update debited fund balance
    let debitedFundDetails: FundDetailsModel = await getFundDetailsById(debitedFundId);
    let updatedAmount: number = debitedFundDetails.balance - selfTransferObj.amount;
    await updateFundBalance(updatedAmount, debitedFundId);

    // Save credit
    let creditReasonModel: CreditReasonModel = await getCreditReasonDetailsByNameService("Self Transfer");
    let creditObj: CreditModel = {
        credit_reason_id_fk: creditReasonModel.credit_reason_id,
        fund_id_fk: creditedFundId,
        amount: selfTransferObj.amount,
        person_id_fk: null,
        message: selfTransferObj.message
    }

    await saveCreditDetailsService(creditObj);

    // Update credited fund balance
    let creditedFundDetails: FundDetailsModel = await getFundDetailsById(creditedFundId);
    updatedAmount = creditedFundDetails.balance + selfTransferObj.amount;
    await updateFundBalance(updatedAmount, creditedFundId);
}

export {
    startSelfTransaction
}