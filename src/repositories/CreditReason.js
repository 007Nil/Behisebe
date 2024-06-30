import { useRealm } from "@realm/react";
import { CreditReasonModel } from "../model/index";

import { useRealm } from "@realm/react";
import { ExpenseReasonModel } from "../model/index";

async function openRealm() {
  return await useRealm.open({
    schema: [ExpenseReasonModel],
  });
}
