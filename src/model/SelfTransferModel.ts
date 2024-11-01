type SelfTransferModel = {
    transferFromFundId?: number,
    transferToFundId: number,
    amount: number,
    message: string
}

export default SelfTransferModel;