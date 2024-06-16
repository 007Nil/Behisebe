import { FundDetailsModel } from "../model";
import Realm from "realm";

async function openRealm() {
  return await Realm.open({
    schema: [FundDetailsModel],
  });
}

async function getAllFunds() {
  const realm = await openRealm();
  // console.log(realm.objects("FundDetails"));
  return await realm.objects("FundDetails");
}

async function saveFundDetails(fundObject) {
  const realm = await openRealm();
  try {
    realm.write(() => {
      realm.create("FundDetails", {
        _id: fundObject._id,
        fund_name: fundObject.fund_name,
        fund_type: fundObject.fund_type,
        balance: parseFloat(fundObject.balance),
        is_active: fundObject.is_active,
      });
    });
  } catch(error) {
    console.log(error);
  }
}

export { getAllFunds, saveFundDetails };
