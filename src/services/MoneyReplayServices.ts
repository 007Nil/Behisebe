import { ExpenseModel, LendMoneyModel, MoneyBorrowModel, MoneyRepayModel } from "../model";
import { getLendMoneyExpenseDetails } from "../repository/ExpenseDetailsRepo";
import { getFundDetailsById } from "../repository/FundDetailsRepo";
import { getPersonDetailsByIdService } from "./PersonDetailsServices";

async function getMoneyRepayDetailsService(repayType: string): Promise<MoneyRepayModel[]> {
    const returnData: MoneyRepayModel[] = [];
    if (repayType === "getLendInfo") {
        const lendMoneyExpenseDetails: ExpenseModel[] = await getLendMoneyExpenseDetails();
        
        for (const eachExpense of lendMoneyExpenseDetails) {

        }
        for (const eachLendExpense of lendMoneyExpenseDetails) {

            const personDetails = await getPersonDetailsByIdService(eachLendExpense.person_id_fk);
            const fundDetails = await getFundDetailsById(eachLendExpense.fund_id_fk);
            let eachObj: MoneyRepayModel = {
                expense_id: eachLendExpense.expense_id,
                credit_id: null,
                amount: eachLendExpense.amount,
                paid_amount: 0,
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

export {
    getMoneyRepayDetailsService
}