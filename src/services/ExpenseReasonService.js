import { getAllExpenseReasonDetails } from "../repositories/ExpenseReasonRepo";

async function getExpenseReason() {
  return await getAllExpenseReasonDetails();
}
export { getExpenseReason };
