
import { OpenRealm } from "./OpenConnection";

async function getAllFunds() {
  const realm = await OpenRealm();
  return realm.objects("FundDetails");
}

async function saveFundDetails(fundObject) {
  const realm = await OpenRealm();

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
  } catch (error) {
    console.log(error);
  }
}

async function getFundDetailsById(fund_id) {
  try {
    const realm = await OpenRealm();
    const fundDetailsData = realm.objects("FundDetails");
    const filterData = fundDetailsData.filtered("_id = $0",fund_id);
    return filterData[0];
  } catch (error) {
    console.log(error);
  }
}

async function updateFundDetails(fundObject){
  try{
    const realm = await OpenRealm();
    realm.write(() => {
      let data = realm.objectForPrimaryKey('FundDetails', fundObject._id);
      data.fund_name =fundObject.fund_name;
      data.fund_type =fundObject.fund_type;
      data.balance = parseFloat(fundObject.balance);
      data.is_active = fundObject.is_active;

    });
  }catch (error){
    console.log(error)
  }
}

export { getAllFunds, saveFundDetails, getFundDetailsById, updateFundDetails };
