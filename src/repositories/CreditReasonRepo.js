import { OpenRealm } from "./OpenConnection";

async function getAllCreditReasonDetails() {
  const realm = await OpenRealm();
  return realm.objects("CreditReason");
}

async function saveCreditReason(creditObj){
  const realm = await OpenRealm();
  try {
    realm.write(() => {
      realm.create("CreditReason", {
        _id: creditObj._id,
        credit_reason: creditObj.credit_reason,
        credit_category: creditObj.credit_category
      });
    });
  } catch (error) {
    console.log(error);
  }
}


async function updateCreditReasonDetails(creditObj){
  try{
    const realm = await OpenRealm();
    realm.write(() => {
      let data = realm.objectForPrimaryKey('CreditReason', creditObj._id);
      data.credit_reason = creditObj.credit_reason,
      data.credit_category = creditObj.credit_category
    });
  }catch (error){
    console.log(error)
  }
}

export {getAllCreditReasonDetails, saveCreditReason, updateCreditReasonDetails};