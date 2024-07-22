import { FundDetailsModel, ExpenseReasonModel, CreditReasonModel, PersonModel } from "../model/index";
import Realm from "realm";

async function OpenRealm() {
    return await Realm.open({
      schema: [FundDetailsModel, ExpenseReasonModel, CreditReasonModel, PersonModel],
    });
}

export {OpenRealm}