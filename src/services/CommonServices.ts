import { CreditModel, CreditReasonModel, ExpenseModel, ExpenseReasonModel, FundDetailsModel } from "../model";
import CustomList from "../model/CustomListModel";
import { getFundDetailsById } from "../repository/FundDetailsRepo";
import { getExpenseReasonByID } from "../repository/ExpenseDetailsRepo";
import { getCreditReasonById, getCreditReasonByIdService } from "./CreditDetailsServices";

type prepareCustomListProps = {
    listType: string,
    expenseObj?: ExpenseModel[]
    creditObj?: CreditModel[]
}

async function prepareCustomList(props: prepareCustomListProps): Promise<CustomList[]> {
    let returnValue: CustomList[] = []
    if (props.listType === "expenseDetails") {
        // props.expenseObj.forEach(async (eachExpense) => {
        for (const eachExpense of props.expenseObj) {
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
        }
        return returnValue;
    } else if (props.listType === "creditDetails") {
        props.creditObj.forEach(async eachCredit => {
            let customList: CustomList;
            const fundDetails: FundDetailsModel = await getFundDetailsById(eachCredit.fund_id_fk);
            const creditReasonDetails: CreditReasonModel = await getCreditReasonByIdService(eachCredit.credit_reason_id_fk);
            customList = {
                fund_name: fundDetails.fund_name,
                reason: creditReasonDetails.credit_reason_name,
                catagory: "expenseDetails",
                amount: eachCredit.amount.toString(),
                date: eachCredit.timestamp
            };
            returnValue.push(customList);
        });
        return returnValue;
    }
    return [];

}

export {
    prepareCustomList
}