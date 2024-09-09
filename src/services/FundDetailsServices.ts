import FundDetailsModel from '../model/FundDetailsModel';
import { addFundDetails } from '../repository/FundDetailsRepo';
function addFundDetailsService(fundObj: FundDetailsModel){
    
}

async function SaveFundDetailsService(fundObj: FundDetailsModel){
    await addFundDetails(fundObj);
}

export {SaveFundDetailsService};