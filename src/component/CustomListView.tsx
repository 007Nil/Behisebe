import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
// import Modal
import styles from '../screens/audit/styles'
import CustomList from '../model/CustomListModel'
import Modal from "react-native-modal";
import { TextInput } from 'react-native-gesture-handler'
import { CreditModel, ExpenseModel, FundDetailsModel } from '../model'
import { deleteExpenseDataService, saveExpenseDetailsService, updateExpenseDetailsService } from '../services/ExpenseDetailsServices'
import { getFundBalance, updateFundBalance } from '../repository/FundDetailsRepo'
import { expense_reason } from '../dummy_data'
import { getExpenseByID } from '../repository/ExpenseDetailsRepo'
import { getCreditDetailsById } from '../repository/CreditDetailsRepo'

type CustomListProps = {
    listData: CustomList[],
    pageName?: string
}

const CustomListView = ({ listData, pageName }: CustomListProps) => {
    const [flatListData, setFlatListData] = useState<CustomList[]>([]);

    const [reason, setReason] = useState<string>("");
    const [catagory, setCatagory] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [fundName, setFundName] = useState<string>("");

    const [reasonId, setReasonId] = useState<number>(0);
    const [expenseId, setExpesneId] = useState<number>(0);
    const [creditId, setCreditId] = useState<number>(0);
    const [fundId, setFundId] = useState<number>(0);
    const [updatedAmount, setUpdatedAmount] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modal2Open, setModal2Open] = useState<boolean>(false);




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
        if (deleteTrue) {
            setModal2Open(true);
        } else {
            setModalOpen(true);
        }
    };
    const deleteFromDatabase = async () => {
        if (catagory === "expenseDetails") {
            // Need to fix this logic
            if (reason === "Self Transfer"){
                const expenseData: ExpenseModel = await getExpenseByID(expenseId);
                const creditId: number = expenseData.credit_id;
                const creditObj : CreditModel = await getCreditDetailsById(creditId);
                const debitedAmount: number = creditObj.amount;
                let fundBalance: number = await getFundBalance(creditObj.fund_id_fk);            
                let updatedFundAmount: number = fundBalance - debitedAmount
                await updateFundBalance(updatedFundAmount, creditObj.fund_id_fk);
            }

            deleteExpenseDataService(expenseId);
            let fundBalance: number = await getFundBalance(fundId)
            await updateFundBalance((fundBalance + Number(amount)), fundId);
            setModal2Open(false);
            alert("Opeartion Successful");
        } else if (catagory === "creditDetails") {

        }
    }
    const updateDatabase = async () => {
        if (updatedAmount === "" || updatedAmount === "0") {
            alert("Invalid Amount");
            return;
        }
        if (catagory === "expenseDetails") {
            let updatedExpenseModel: ExpenseModel = {
                fund_id_fk: fundId,
                expense_id: expenseId,
                amount: Number(updatedAmount),
                expense_reason_id_fk: reasonId
            }

            await updateExpenseDetailsService(updatedExpenseModel);
            let updatedFundAmount: number = 0;
            let fundBalance: number = await getFundBalance(fundId);
            if (Number(updatedAmount) > Number(amount)) {
                updatedFundAmount = fundBalance - Number(updatedAmount)
            } else {
                updatedFundAmount = fundBalance + Number(updatedAmount)
            }
            await updateFundBalance(updatedFundAmount, fundId);
            setModalOpen(false);
            alert("Opeartion Successful");
        } else if (catagory === "creditDetails") {
            setModalOpen(false);
            alert("Opeartion Successful");
        }



    };

    return (
        <View>
            <FlatList
                contentContainerStyle={{ marginTop: moderateVerticalScale(30) }}
                data={flatListData}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.transactionItem}>
                            <View>
                                <View style={styles.topLeftView}>
                                    <View style={styles.iconView}>
                                        <Image source={item.catagory === "expenseDetails" ? require('../images/down-right.png') : require('../images/creadited.png')} style={styles.icon2} />

                                    </View>
                                    <View style={{ marginLeft: moderateScale(10) }}>
                                        <Text style={styles.paidTo}>{item.reason === "Repay Borrowed Money" ? "Repay Money" : item.reason}</Text>
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
                                            onPress={() => updateData(item, false)}>
                                            <Text style={styles.appButtonText}>Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.appButtonContainerDelete]}
                                            onPress={() => updateData(item, true)}>
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
                                        <Text>{"Self Transfer detected. It will also delete the extry from Credit Details. Please be carefull next time"}</Text>
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