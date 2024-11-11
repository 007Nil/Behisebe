import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
// import Modal
import styles from '../screens/audit/styles'
import CustomList from '../model/CustomListModel'
import Modal from "react-native-modal";
import { TextInput } from 'react-native-gesture-handler'
import { CreditModel, ExpenseModel, FundDetailsModel, LendMoneyModel, MoneyBorrowModel } from '../model'
import { deleteExpenseDataService, saveExpenseDetailsService, updateExpenseDetailsService } from '../services/ExpenseDetailsServices'
import { getFundBalance, updateFundBalance } from '../repository/FundDetailsRepo'
import { getExpenseByID } from '../repository/ExpenseDetailsRepo'
import { deleteCreditData, getBorrowMoneyCreditDetails, getCreditDetailsById } from '../repository/CreditDetailsRepo'
import { getLendMoneyByExpenseId } from '../repository/LendMoneyRepo'
import { deleteCreditDetailsService, updateCreditDetailsService } from '../services/CreditDetailsServices'
import { getBorrowMoneyByCreditId } from '../repository/MoneyBorrowRepo'

type CustomListProps = {
    listData: CustomList[],
    updateTotalAmount?(amount: number, openration: string): void,
    pageName?: string
}

const CustomListView = ({ listData, pageName, updateTotalAmount }: CustomListProps) => {
    const [flatListData, setFlatListData] = useState<CustomList[]>([]);

    const [reason, setReason] = useState<string>("");
    const [catagory, setCatagory] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [fundName, setFundName] = useState<string>("");
    const [formId, setFromId] = useState<number>(0);
    const [reasonId, setReasonId] = useState<number>(0);
    const [expenseId, setExpesneId] = useState<number>(0);
    const [creditId, setCreditId] = useState<number>(0);
    const [fundId, setFundId] = useState<number>(0);
    const [updatedAmount, setUpdatedAmount] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modal2Open, setModal2Open] = useState<boolean>(false);
    const [flatListIndex, setFlatListIndex] = useState<number>(-1);


    useEffect(() => {
        setFlatListData(listData);
    }, [listData]);

    const updateData = (item: CustomList, deleteTrue?: boolean) => {
        setReason(item.reason);
        setCatagory(item.catagory);
        setDate(item.date);
        setAmount(item.amount);
        setFundName(item.fund_name);
        setExpesneId(item.expense_id);
        setCreditId(item.credit_id);
        setFundId(item.fund_id);
        setReasonId(item.reason_id);
        if (!item.credit_id) {
            setFromId(item.expense_id);
        } else {
            setFromId(item.credit_id);
        }

        setFlatListIndex(flatListData.indexOf(item));
        if (deleteTrue) {
            setModal2Open(true);
        } else {
            setModalOpen(true);
        }
    };
    const deleteFromDatabase = async () => {
        let tmpArray = flatListData;
        const newflatListObj: CustomList = {
            amount: updatedAmount,
            catagory: catagory,
            date: date,
            fund_name: fundName,
            reason: reason,
            credit_id: creditId,
            expense_id: expenseId,
            fund_id: fundId,
            reason_id: reasonId,
        }
        let updatedArray: CustomList[];

        if (catagory === "expenseDetails") {
            updatedArray = tmpArray.filter(function (ele) {
                return ele.expense_id !== formId;
            });
            if (reason === "Self Transfer") {
                const expenseData: ExpenseModel = await getExpenseByID(expenseId);
                const creditId: number = expenseData.credit_id;
                const creditObj: CreditModel = await getCreditDetailsById(creditId);
                const creditedAmount: number = creditObj.amount;
                let fundBalance: number = await getFundBalance(creditObj.fund_id_fk);
                let updatedFundAmount: number = fundBalance - creditedAmount;
                await updateFundBalance(updatedFundAmount, creditObj.fund_id_fk);
                await deleteCreditData(creditId);
            } else if (reason === "Lend Money") {
                const lendMoneyDetails: LendMoneyModel[] = await getLendMoneyByExpenseId(expenseId);
                if (lendMoneyDetails.length != 0) {
                    alert("Cannot Delete This Entry. Since you already get the partial payment");
                    setModal2Open(false);
                    return;
                }
            }

            deleteExpenseDataService(expenseId);
            let fundBalance: number = await getFundBalance(fundId)
            await updateFundBalance((fundBalance + Number(amount)), fundId);
            setModal2Open(false);
            alert("Opeartion Successful");
        } else if (catagory === "creditDetails") {
            updatedArray = tmpArray.filter(function (ele) {
                return ele.credit_id !== formId;
            });
            if (reason === "Self Transfer") {
                const creditData: CreditModel = await getCreditDetailsById(creditId);
                const expense_id = creditData.expense_id;
                const expenseDetails: ExpenseModel = await getExpenseByID(expense_id);
                let fundBalance: number = await getFundBalance(expenseDetails.fund_id_fk);
                const debitedAmount: number = expenseDetails.amount;
                let updatedFundAmount: number = fundBalance + debitedAmount;
                await updateFundBalance(updatedFundAmount, expenseDetails.fund_id_fk);
                await deleteExpenseDataService(expense_id);
            } else if (reason === "Borrow Money") {
                updatedArray = tmpArray.filter(function (ele) {
                    return ele.credit_id !== formId;
                });
                const borrowMoneyDetails: MoneyBorrowModel[] = await getBorrowMoneyByCreditId(creditId);
                if (borrowMoneyDetails.length > 0) {
                    alert("Cannot Delete This Entry. Since you already paid the partial payment");
                    setModal2Open(false);
                    return;
                }
            }
            await deleteCreditDetailsService(creditId);
            let fundBalance: number = await getFundBalance(fundId)
            await updateFundBalance((fundBalance - Number(amount)), fundId);
            setModal2Open(false);
            alert("Opeartion Successful");
        }
        updatedArray.splice(flatListIndex, 0);
        setFlatListData(updatedArray);
        updateTotalAmount(Number(amount), "minus");
    }

    const updateDatabase = async () => {
        if (updatedAmount === "" || updatedAmount === "0") {
            alert("Invalid Amount");
            return;
        }

        let tmpArray = flatListData;
        const newflatListObj: CustomList = {
            amount: updatedAmount,
            catagory: catagory,
            date: date,
            fund_name: fundName,
            reason: reason,
            credit_id: creditId,
            expense_id: expenseId,
            fund_id: fundId,
            reason_id: reasonId,
        }
        let updatedArray: CustomList[];
        let operation: string = "minus";
        let amountDiff : number = 0;
        if (catagory === "expenseDetails") {
            updatedArray = tmpArray.filter(function (ele) {
                return ele.expense_id !== formId;
            });
            let updatedFundAmount: number = 0;
            let fundBalance: number = await getFundBalance(fundId);

            if (Number(updatedAmount) > Number(amount)) {
                amountDiff = Number(updatedAmount) - Number(amount)
                updatedFundAmount = fundBalance - amountDiff;
                operation = "plus";
                if (updatedFundAmount < 0) {
                    alert("Cannot update this entry. This fund does not have sufficient balance");
                    return;
                }
            } else {
                amountDiff = Number(amount) - Number(updatedAmount)
                updatedFundAmount = fundBalance + amountDiff;

            }
            if (reason === "Lend Money") {
                const lendMoneyDetails: LendMoneyModel[] = await getLendMoneyByExpenseId(expenseId);
                if (lendMoneyDetails.length != 0) {
                    alert("Cannot Delete This Entry. Since you already get the partial payment");
                    return;
                }
            }
            if (reason === "Self Transfer") {
                const expenseData: ExpenseModel = await getExpenseByID(expenseId);
                const creditId: number = expenseData.credit_id;
                const creditObj: CreditModel = await getCreditDetailsById(creditId);
                let updatedCreditFundAmount: number = 0;
                let creditFundBalance: number = await getFundBalance(creditObj.fund_id_fk);
                if (Number(updatedAmount) > Number(amount)) {
                    updatedCreditFundAmount = creditFundBalance + (Number(updatedAmount) - Number(amount));
                } else {
                    updatedCreditFundAmount = creditFundBalance - (Number(amount) - Number(updatedAmount));
                    if (updatedCreditFundAmount < 0) {
                        alert("Cannot delete this entry. Fund balance cannot be less that 0");
                        return;
                    }
                }
                await updateFundBalance(updatedCreditFundAmount, creditObj.fund_id_fk);
                let updateCreditObj: CreditModel = {
                    credit_id: creditObj.credit_id,
                    fund_id_fk: creditObj.fund_id_fk,
                    credit_reason_id_fk: creditObj.credit_reason_id_fk,
                    amount: Number(updatedAmount),
                    timestamp: date
                }
                await updateCreditDetailsService(updateCreditObj);
            }
            let updatedExpenseModel: ExpenseModel = {
                fund_id_fk: fundId,
                expense_id: expenseId,
                amount: Number(updatedAmount),
                expense_reason_id_fk: reasonId,
                timestamp: date
            }
            await updateExpenseDetailsService(updatedExpenseModel);

            await updateFundBalance(updatedFundAmount, fundId);

            setModalOpen(false);
            alert("Expense Data Updated");
            updateTotalAmount(amountDiff, operation);
        } else if (catagory === "creditDetails") {

            updatedArray = tmpArray.filter(function (ele) {
                return ele.credit_id !== formId;
            });
            let updatedFundAmount: number = 0;
            let fundBalance: number = await getFundBalance(fundId);
            if (Number(updatedAmount) > Number(amount)) {
                operation = "plus";
                amountDiff = Number(updatedAmount) - Number(amount);
                updatedFundAmount = fundBalance + amountDiff;
            } else {
                amountDiff = Number(amount) - Number(updatedAmount);
                updatedFundAmount = fundBalance - amountDiff;
                if (updatedFundAmount < 0) {
                    alert("Cannot delete this entry. Fund balance cannot be less that 0");
                    return;
                }
            }
            if (reason === "Borrow Money") {
                const borrowMoneyDetails: MoneyBorrowModel[] = await getBorrowMoneyByCreditId(creditId);
                if (borrowMoneyDetails.length != 0) {
                    alert("Cannot Delete This Entry. Since you already get the partial payment");
                    return;
                }
            }
            if (reason === "Self Transfer") {
                const creditData: CreditModel = await getCreditDetailsById(creditId);
                const expenseId: number = creditData.expense_id;
                const expenseObj: ExpenseModel = await getExpenseByID(expenseId);
                let updatedExpenseFundAmount: number = 0;
                let expenseFundBalance: number = await getFundBalance(expenseObj.fund_id_fk);
                if (Number(updatedAmount) > Number(amount)) {
                    updatedExpenseFundAmount = expenseFundBalance - (Number(updatedAmount) - Number(amount));
                } else {
                    updatedExpenseFundAmount = expenseFundBalance + (Number(amount) - Number(updatedAmount));
                    if (updatedExpenseFundAmount < 0) {
                        alert("Cannot delete this entry. Fund balance cannot be less that 0");
                        return;
                    }
                }
                await updateFundBalance(updatedExpenseFundAmount, expenseObj.fund_id_fk);
                let updateExpenseObj: ExpenseModel = {
                    expense_id: expenseObj.expense_id,
                    fund_id_fk: expenseObj.fund_id_fk,
                    expense_reason_id_fk: expenseObj.expense_reason_id_fk,
                    amount: Number(updatedAmount),
                    timestamp: date
                }
                await updateExpenseDetailsService(updateExpenseObj);
            }
            let updateCreditObj: CreditModel = {
                credit_id: creditId,
                fund_id_fk: fundId,
                credit_reason_id_fk: reasonId,
                amount: Number(updatedAmount),
                timestamp: date
            }
            await updateCreditDetailsService(updateCreditObj);


            await updateFundBalance(updatedFundAmount, fundId);
            setModalOpen(false);
            alert("Credit Data Updated");
            updateTotalAmount(amountDiff, operation);
        }
        updatedArray.splice(flatListIndex, 0, newflatListObj);
        setFlatListData(updatedArray);
    };

    const cancleOperation = () => {
        alert("Cannot Update This Entry. Since you already get the partial payment");
    }

    return (
        <View>
            <FlatList
                contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
                data={flatListData}
                renderItem={({ item, index }) => {
                    return (
                        <View style={pageName !== "history" ? styles.transactionItem : styles.transactionItemHistroy}>
                            <View>
                                <View style={styles.topLeftView}>
                                    <View style={styles.iconView}>
                                        <Image source={item.catagory === "expenseDetails" ? require('../images/down-right.png') : require('../images/creadited.png')} style={styles.icon2} />

                                    </View>
                                    <View style={{ marginLeft: moderateScale(10) }}>
                                        <Text style={styles.paidTo}>{item.reason}</Text>
                                    </View>
                                </View>
                                <Text style={styles.time}>{"On Date"}</Text>
                                <Text style={[{ fontWeight: "bold", marginLeft: moderateScale(20), marginTop: moderateVerticalScale(10), }]}>{item.date}</Text>

                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.amount}>{' ₹ ' + item.amount}</Text>
                                <View style={styles.bankView}>
                                    <Text style={[styles.time, { marginTop: 0 }]}>{item.catagory === "expenseDetails" ? 'debited from ' : 'credited to'}</Text>

                                </View>
                                <View style={styles.bankView3}>
                                    <Text style={[{ marginTop: 0, fontWeight: "bold" }]}>{item.fund_name}</Text>

                                </View>
                                {pageName !== "history" ?
                                    <View style={styles.bankView1}>
                                        <TouchableOpacity style={[styles.appButtonContainer]}
                                            onPress={() => { item.reason === "Pay Back" || item.reason === "Credit Card Bill" ? cancleOperation() : updateData(item, false) }}>
                                            <Text style={styles.appButtonText}>Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.appButtonContainerDelete]}
                                            onPress={() => { item.reason === "Pay Back" || item.reason === "Credit Card Bill" ? cancleOperation() : updateData(item, true) }}>
                                            <Text style={styles.appButtonText}>Delete</Text>
                                        </TouchableOpacity>

                                    </View>
                                    : null}
                            </View>
                        </View>
                    )
                }} />
            <Modal
                isVisible={modalOpen}
                backdropOpacity={0.2}
                style={styles.modaView}
            >
                <View style={styles.mainView}>
                    <View style={styles.modalTopView}>
                        <Text style={styles.payable}>Edit Info</Text>
                        <View style={styles.modalTopRightView}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalOpen(false);
                                }}
                            >
                                <Image
                                    source={require("../images/close.png")}
                                    style={[
                                        styles.backIcon,
                                        { tintColor: "black", width: scale(16) },
                                    ]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.divider}></View>
                    <View style={styles.bankView}>
                        <View style={styles.bankLeftView}>
                            <View style={{ marginLeft: moderateScale(15) }}>
                                <View style={styles.upi_view}>
                                    <Text>{modalOpen && catagory === "expenseDetails" ?
                                        "Debited From:  " + fundName :
                                        "Credited To:  " + fundName}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bankView}>
                        <View style={styles.bankLeftView}>
                            <View style={{ marginLeft: moderateScale(15) }}>
                                <View style={styles.upi_view}>
                                    <Text>{"Date: " + date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bankView}>
                        <View style={styles.bankLeftView}>
                            <View style={{ marginLeft: moderateScale(15) }}>
                                <View style={styles.upi_view}>
                                    <Text>{"Amount: " + amount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bankView}>
                        <View style={styles.bankLeftView}>
                            <View style={{ marginLeft: moderateScale(15) }}>
                                <View style={styles.upi_view}>
                                    <Text>Updated Amount</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholderTextColor={"#929292"}
                                        placeholder="Enter Amount"
                                        keyboardType="number-pad"
                                        value={updatedAmount}
                                        onChangeText={(txt) => setUpdatedAmount(txt)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.confirmPayNow}
                        onPress={() => {
                            updateDatabase();
                        }}
                    >
                        <Text style={styles.title}>{"Update  Amount"}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                isVisible={modal2Open}
                backdropOpacity={0.2}
                style={styles.modaView}
            >
                <View style={styles.mainView}>
                    <View style={styles.modalTopView}>
                        <Text style={styles.payable}>Delete Confirm</Text>
                        <View style={styles.modalTopRightView}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModal2Open(false);
                                }}
                            >
                                <Image
                                    source={require("../images/close.png")}
                                    style={[
                                        styles.backIcon,
                                        { tintColor: "black", width: scale(16) },
                                    ]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.divider}></View>
                    {reason === "Self Transfer" ?
                        <View style={styles.bankView}>
                            <View style={styles.bankLeftView}>
                                <View style={{ marginLeft: moderateScale(15) }}>
                                    <View style={styles.upi_view}>
                                        <Text>{"Self Transfer detected. It will also delete the entry from Credit Details. Please be carefull next time"}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        : null}
                    <TouchableOpacity
                        style={styles.delete}
                        onPress={() => {
                            deleteFromDatabase();
                        }}
                    >
                        <Text style={styles.title}>{reason === "Self Transfer" ?
                            "Confirm Delete" : "Delete"}</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    );

}

export default CustomListView