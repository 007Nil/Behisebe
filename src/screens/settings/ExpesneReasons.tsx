import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import {
  moderateScale,
  scale,
} from "react-native-size-matters";

const styles = require("./styles")

import CommonHeader from "../../common/CommonHeader";
import Modal from "react-native-modal";
import { AddExpenseCustomFlatList, CustomButton } from "../../component";

import { getAllExpenseReasonDetailsService, addExpenseReasonService } from "../../services/ExpenseDetailsServices"; 
import { ExpenseReasonModel } from "../../model";

const ExpesneReasons = () => {
  const [expenseData ,setExpenseData] = useState<ExpenseReasonModel[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [expenseReason, setExpenseReason] = useState<string>("");
  const [expenseCatagory, setExpenseCatagory] = useState<string>("");

  useEffect(() => {
    getAllExpenseReasonDetailsService().then( data => setExpenseData(data))
  },[]);


  const getModalopen = (modelState: boolean) => {
    setModalOpen(modelState);
  };
  const resetState =  () => {
    setExpenseReason("");
    setExpenseCatagory("");
    setModalOpen(false);
    alert("Expense Reason Data Saved!")
  }
  const addExpenseReason = async () => {
    if (expenseReason === "") {
      alert("Please add Expense Reason");
      return;
    }
    if (expenseCatagory === "") {
      alert("Please add Expense Catagory");
      return;
    }
    let expenseReasonObj :  ExpenseReasonModel
    expenseReasonObj = {
      expense_reason_name: expenseReason,
      expense_reason_catagory: expenseCatagory,
    };
    await addExpenseReasonService(expenseReasonObj);
    let newExpenseReasonDetails = [...expenseData, expenseReasonObj];
    setExpenseData(newExpenseReasonDetails);
    resetState();
  };
  return (
    <View style={styles.container}>
      <CommonHeader title={"Expense Reason Settings"} />
      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.search}
        />
        <Text style={styles.searchText}>Search by Expense Reason Name</Text>
      </View>
      <View style={styles.card}>
        <AddExpenseCustomFlatList
          data={expenseData}/>
      </View>
      <CustomButton pressEvent={"addExpense"} getModalopen={getModalopen} />
      <Modal
        isVisible={modalOpen}
        backdropOpacity={0.2}
        style={styles.modaView}
      >
        <View style={styles.mainView}>
          <View style={styles.modalTopView}>
            <Text style={styles.payable}>Expense Details</Text>
            <View style={styles.modalTopRightView}>
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                }}
              >
                <Image
                  source={require("../../images/close.png")}
                  style={[
                    styles.backIcon,
                    { tintColor: "black", width: scale(16) },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Reason Name"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(reason) => setExpenseReason(reason)}
                  value={expenseReason}
                />
              </View>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Reason Catagory"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(catagory) => setExpenseCatagory(catagory)}
                  value={expenseCatagory}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.confirmPayNow}
            onPress={addExpenseReason}
          >
            <Text style={styles.title}>{"Add Expense"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ExpesneReasons;