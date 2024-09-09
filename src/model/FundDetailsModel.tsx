type FundDetailsModel = {
    _id?: number,
    fund_name: string;
    fund_type: string;
    balance: number;
    is_active?: boolean;
    notes?: string;

};

export default FundDetailsModel;


