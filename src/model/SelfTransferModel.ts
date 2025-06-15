type SelfTransferModel = {
    transferFromFundId?: number,
    transferToFundId: number,
    amount: number,
    message: string
    is_investment?: number
}

export default SelfTransferModel;