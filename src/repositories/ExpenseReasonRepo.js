import { useRealm } from "@realm/react";
import { ExpenseReasonModel } from "../model/index";

async function openRealm() {
  return await useRealm.open({
    schema: [ExpenseReasonModel],
  });
}

async function getAllExpenseReasonDetails() {
  const realm = await openRealm();
  return await realm.objects("ExpenseReason");
}

export {getAllExpenseReasonDetails}