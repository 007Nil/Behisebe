import FundDetailsModel from '../model/FundDetailsModel';
import { addFundDetails, getAllFundDetails, updateFundDetails, getFundBalance } from '../repository/FundDetailsRepo';
async function getAllFundDetailsService(): Promise<FundDetailsModel[]> {
    return await getAllFundDetails();
}


async function getValidFundDetailsService(): Promise<FundDetailsModel[]> {
    const allFundDetails: FundDetailsModel[] = await getAllFundDetails();
    const validFundDetailsService = allFundDetails.filter(obj => obj.is_active !== false);
    return validFundDetailsService;
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

async function getFundBalanceService(fundId: number): Promise<number> {
    return await getFundBalance(fundId);
}

export { SaveFundDetailsService, getValidFundDetailsService, getAllFundDetailsService, updateFundDetailsService, getFundBalanceService };