type ExpenseModel = {
    expense_id?: number,
    fund_id_fk: number,
    expense_reason_id_fk: number,
    amount: number,
    person_id_fk?: number // If person id is there then money lend to some one
    message?: string
}

export default ExpenseModel;