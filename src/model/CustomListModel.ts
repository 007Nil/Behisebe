type CustomList = {
    reason: string
    catagory: string // expense or credir
    date: string
    amount: string
    fund_name: string,
    expense_id? : number,
    credit_id?: number,
    fund_id? : number,
    reason_id?: number
}

export default CustomList;