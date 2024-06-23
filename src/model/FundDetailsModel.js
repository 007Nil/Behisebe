const FundDetailsModel = {
    name: "FundDetails",
    properties: {
        _id: "string",
        fund_name: "string",
        fund_type: "string",
        balance: "float",
        is_active: "bool"
    },
    primaryKey: '_id'
}

export default FundDetailsModel;
