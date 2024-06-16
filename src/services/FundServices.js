import { saveFundDetails, getAllFunds } from "../repositories/FundRepo";
async function SaveFundDetails(fundObject) {
  console.log("HIt");
  saveFundDetails(fundObject);
  return;
}

async function getFundDetails() {
  return await getAllFunds();
}

export { SaveFundDetails, getFundDetails };
