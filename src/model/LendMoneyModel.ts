type LendMoneyModel = {
    lend_id?: number,
    expense_id_fk: number,
    paid_amount: number,
    timestamp?: string
}

type InvalidRepay = {
    formId: number,
    expense_id: number | null,
    credit_id: number | null
}

export { LendMoneyModel, InvalidRepay };