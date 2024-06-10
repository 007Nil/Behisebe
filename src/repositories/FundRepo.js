import { FundDetailsModel } from "../model";
import Realm from "realm";

const openRealm = async () => {
  return await Realm.open({
    schema: [FundDetailsModel],
  });
};

const getAllFunds = async () => {
  const realm = await openRealm();
  return realm.objects("Fund");
};

export { getAllFunds };
