import { CreditModel, CreditReasonModel, ExpenseModel, ExpenseReasonModel, FundDetailsModel } from "../model";
import CustomList from "../model/CustomListModel";
import { getFundDetailsById } from "../repository/FundDetailsRepo";
import { getExpenseDetails, getExpenseReasonByID } from "../repository/ExpenseDetailsRepo";
import { getCreditReasonByIdService } from "./CreditDetailsServices";
import { getCreditDetails } from "../repository/CreditDetailsRepo";

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
                fund_id: fundDetails.fund_id,
                reason: expenseReasonDetails.expense_reason_name,
                expense_id: eachExpense.expense_id,
                credit_id: null,
                catagory: "expenseDetails",
                amount: eachExpense.amount.toString(),
                date: eachExpense.timestamp,
                reason_id: eachExpense.expense_reason_id_fk
            };
            returnValue.push(customList);
        }
        return returnValue;
    } else if (props.listType === "creditDetails") {
        for (const eachCredit of props.creditObj) {
            let customList: CustomList;
            const fundDetails: FundDetailsModel = await getFundDetailsById(eachCredit.fund_id_fk);
            const creditReasonDetails: CreditReasonModel = await getCreditReasonByIdService(eachCredit.credit_reason_id_fk);
            customList = {
                fund_name: fundDetails.fund_name,
                fund_id: fundDetails.fund_id,
                credit_id: eachCredit.credit_id,
                expense_id: null,
                reason: creditReasonDetails.credit_reason_name,
                catagory: "creditDetails",
                amount: eachCredit.amount.toString(),
                date: eachCredit.timestamp,
                reason_id: eachCredit.credit_reason_id_fk
            };
            returnValue.push(customList);
        }
        return returnValue;
    }
    return [];

}


async function getTransactionHistoryService(expenseDetails: ExpenseModel[],creditDetails: CreditModel[]): Promise<CustomList[]> {
    const expenseCustomList: CustomList[] = await prepareCustomList({ listType: "expenseDetails", expenseObj: expenseDetails });
    const creditCustomList: CustomList[] = await prepareCustomList({ listType: "creditDetails", creditObj: creditDetails });
    let transactionHistoryUnsorted: CustomList[] = expenseCustomList.concat(creditCustomList);

    let transactionHistory = transactionHistoryUnsorted.sort(
        (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return transactionHistory;

}

export {
    prepareCustomList,
    getTransactionHistoryService,
}