import { OpenRealm } from "./OpenConnection";

async function getAllExpenseReasonDetails() {
  const realm = await OpenRealm();
  return realm.objects("ExpenseReason");
}

async function saveExpenseReason(expoenseObj){
  const realm = await OpenRealm();
  try {
    realm.write(() => {
      realm.create("ExpenseReason", {
        _id: expoenseObj._id,
        expense_reason: expoenseObj.expense_reason,
        expense_category: expoenseObj.expense_category
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateExpensReasonDetails(expoenseObj){
  try{
    const realm = await OpenRealm();
    realm.write(() => {
      let data = realm.objectForPrimaryKey('ExpenseReason', expoenseObj._id);
      data.expense_reason = expoenseObj.expense_reason,
      data.expense_category = expoenseObj.expense_category
    });
  }catch (error){
    console.log(error)
  }
}

export {getAllExpenseReasonDetails, saveExpenseReason, updateExpensReasonDetails}