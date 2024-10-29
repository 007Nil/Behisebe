import FundDetailsModel from '../model/FundDetailsModel';
import { addFundDetails, getAllFundDetails, updateFundDetails,getFundBalance } from '../repository/FundDetailsRepo';
async function getAllFundDetailsService(): Promise<FundDetailsModel[]> {
    return await getAllFundDetails();
}

async function SaveFundDetailsService(fundObj: FundDetailsModel): Promise<void> {
    await addFundDetails(fundObj);
}

async function updateFundDetailsService(fundObj: FundDetailsModel): Promise<void> {
    let fund_status = 1; //active
    if (!fundObj.is_active) {
        fund_status = 0;
    }
    await updateFundDetails(fundObj, fund_status);
}

async function getFundBalanceService(fundId: number) : Promise<number> {
    return await getFundBalance(fundId);
}

export { SaveFundDetailsService, getAllFundDetailsService,updateFundDetailsService,getFundBalanceService };