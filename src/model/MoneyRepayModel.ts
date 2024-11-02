type MoneyRepayModel = {
    expense_id?: number,
    credit_id?: number,
    amount: number,
    paid_amount: number,
    date: string,
    fundName: string,
    message?: string,
    personName: string
}

export default MoneyRepayModel