import { FundDetailsModel, ExpenseReasonModel } from "../model/index";
import Realm from "realm";

async function OpenRealm() {
    return await Realm.open({
      schema: [FundDetailsModel, ExpenseReasonModel],
    });
}

export {OpenRealm}