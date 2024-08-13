import {
  getAllExpenseReasonDetails,
  saveExpenseReason,
  updateExpensReasonDetails,
} from "../repositories/ExpenseReasonRepo";

async function getExpenseReason() {
  return await getAllExpenseReasonDetails();
}

async function saveExpenseReasonService(expenseObj) {
  await saveExpenseReason(expenseObj);
  return;
}

async function updateExpenseReason(expenseObj) {
  await updateExpensReasonDetails(expenseObj);
  return;
}
export { getExpenseReason, saveExpenseReasonService, updateExpenseReason };
