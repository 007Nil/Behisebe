import { ExpenseModel, ExpenseReasonModel, FundDetailsModel } from "../model";
import CustomList from "../model/CustomListModel";
import { getFundDetailsById } from "../repository/FundDetailsRepo";
import { getExpenseReasonByID } from "../repository/ExpenseDetailsRepo";


async function prepareCustomList(listType: string, expenseObj: ExpenseModel[]): Promise<CustomList[]> {
    const returnValue: CustomList[] = [];
    if (listType === "expenseDetails") {
        expenseObj.forEach(async (eachExpense) => {
            let customList: CustomList;
            const fundDetails: FundDetailsModel = await getFundDetailsById(eachExpense.fund_id_fk);
            const expenseReasonDetails: ExpenseReasonModel = await getExpenseReasonByID(eachExpense.expense_reason_id_fk);
            customList = {
                fund_name: fundDetails.fund_name,
                reason: expenseReasonDetails.expense_reason_name,
                catagory: "expenseDetails",
                amount: eachExpense.amount.toString(),
                date: eachExpense.timestamp
            };
            returnValue.push(customList);
        });
        return returnValue;
    }
    return [];
    // console.log(returnValue);

}

export {
    prepareCustomList
}