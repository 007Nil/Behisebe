import { SQLiteRunResult } from "expo-sqlite";
import { ExpenseModel, CreditModel, FundDetailsModel, ExpenseReasonModel, CreditReasonModel } from "../model";
import { getExpenseReasonByNameService, saveExpenseDetailsService, } from "./ExpenseDetailsServices";
import { getCreditReasonDetailsByNameService, saveCreditDetailsService } from "./CreditDetailsServices";
import { updateFundBalance, getFundDetailsById } from "../repository/FundDetailsRepo";
import { SelfTransferModel } from "../model";
import { updateExpenseDetailsCreditId } from "../repository/ExpenseDetailsRepo";

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
        message: selfTransferObj.message,
        timestamp: "",
        is_investment: selfTransferObj.is_investment 
    }
    const expId : number = await saveExpenseDetailsService(expenseObj);



    // Save credit
    let creditReasonModel: CreditReasonModel = await getCreditReasonDetailsByNameService("Self Transfer");
    let creditObj: CreditModel = {
        credit_reason_id_fk: creditReasonModel.credit_reason_id,
        fund_id_fk: creditedFundId,
        amount: selfTransferObj.amount,
        person_id_fk: null,
        message: selfTransferObj.message,
        expense_id: expId,
        timestamp: ""
    }

    const creditId = await saveCreditDetailsService(creditObj);

    // Update the expense
    await updateExpenseDetailsCreditId(expId,creditId);
}

export {
    startSelfTransaction
}