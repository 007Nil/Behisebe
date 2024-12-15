type LendMoneyModel = {
    lend_id?: number,
    expense_id_fk: number,
    paid_amount: number,
    timestamp?: string
}

export default LendMoneyModel;