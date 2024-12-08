type MoneyBorrowModel = {
    borrow_id?: number,
    credit_id_fk: number,
    paid_amount: number,
    timestamp?: string
}

export default MoneyBorrowModel;