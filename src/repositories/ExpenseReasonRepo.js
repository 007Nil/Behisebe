import { OpenRealm } from "./OpenConnection";

async function getAllExpenseReasonDetails() {
  const realm = await OpenRealm();
  return realm.objects("ExpenseReason");
}

async function saveExpenseReason(expenseObj){
  const realm = await OpenRealm();
  try {
    realm.write(() => {
      realm.create("ExpenseReason", {
        _id: expenseObj._id,
        expense_reason: expenseObj.expense_reason,
        expense_category: expenseObj.expense_category
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateExpensReasonDetails(expenseObj){
  try{
    const realm = await OpenRealm();
    realm.write(() => {
      let data = realm.objectForPrimaryKey('ExpenseReason', expenseObj._id);
      data.expense_reason = expenseObj.expense_reason,
      data.expense_category = expenseObj.expense_category
    });
  }catch (error){
    console.log(error)
  }
}

export {getAllExpenseReasonDetails, saveExpenseReason, updateExpensReasonDetails}