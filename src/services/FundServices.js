import { saveFundDetails, getAllFunds } from "../repositories/FundRepo";
async function SaveFundDetails(fundObject) {
  saveFundDetails(fundObject);
  return;
}

async function getFundDetails() {
  return await getAllFunds();
}

export { SaveFundDetails, getFundDetails };
