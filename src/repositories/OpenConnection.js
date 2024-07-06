import { FundDetailsModel, ExpenseReasonModel, CreditReasonModel } from "../model/index";
import Realm from "realm";

async function OpenRealm() {
    return await Realm.open({
      schema: [FundDetailsModel, ExpenseReasonModel, CreditReasonModel],
    });
}

export {OpenRealm}