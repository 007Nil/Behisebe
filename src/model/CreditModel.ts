type CreditModel = {
    credit_id?: number,
    fund_id_fk: number,
    credit_reason_id_fk: number,
    amount: number,
    person_id_fk?: number, // If person id is there then money lend to some one
    message?: string,
    timestamp?: string,
    expense_id?: number,
}

export default CreditModel;