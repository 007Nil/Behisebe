const Bank = class {
    constructor(
        bankID,
        bankName,
        acccountType,
        userID,
        isDefault,
        addedOn,
        notes
    ){
        this.bankID = bankID;
        this.bankName = bankName;
        this.acccountType = acccountType;
        this.userID = userID;
        this.isDefault = isDefault;
        this.notes = notes;
    }
}

module.exports =  Bank;