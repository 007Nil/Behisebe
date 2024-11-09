import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

import CommonHeader from "../../common/CommonHeader";
import {
  moderateScale,
  scale,
} from "react-native-size-matters";
import Modal from "react-native-modal";

import styles from "./styles"; import AddFundCustomFlatList from "../../component/AddFundCustomFlatList";
import { CustomButton } from "../../component";
import { FundDetailsModel } from "../../model";

// Services
import { SaveFundDetailsService, getAllFundDetailsService } from "../../services/FundDetailsServices";

const Funds = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [fundData, setFundData] = useState<FundDetailsModel[]>([]);
  const [fundName, setFundName] = useState<string>("");
  const [fundType, setFundType] = useState<string>("");
  const [fundAmount, setFundAmount] = useState<number>(0);
  const [creditAmount, setCreditAmount] = useState<number>(null);
  const [searchText, setSearchText] = useState<string>("");
  useEffect(() => {
    getAllFundDetailsService().then(data => setFundData(data))
  }, []);
  const getModalopen = (modelState: boolean) => {
    setModalOpen(modelState);
  };
  const resetState = () => {
    setFundName("");
    setFundType("");
    setFundAmount(0);
    setModalOpen(false);
  };
  const addFunds = async () => {
    if (fundName === "") {
      alert("Fund Name cannot emply");
      return;
    }
    if (fundType === "") {
      alert("Fund Type cannot emply");
      return;
    }
    if (fundAmount == 0) {
      alert("Balance cannot 0");
      return;
    }
    if (fundType === "Credit Card"){
      if (creditAmount == 0){
        alert("For a Credit Card Limit cannot be 0");
        return;
      } else if (creditAmount < fundAmount){
        alert("Card Balance is greater that Card limit. That's not possible");
        return;
      }
    }
    let fundObject = {
      fund_name: fundName,
      fund_type: fundType,
      balance: fundAmount,
      is_active: true,
      credit_limit: creditAmount
    };
    let newFundDetails = [...fundData, fundObject];
    await SaveFundDetailsService(fundObject);
    setFundData(newFundDetails);
    console.log(fundObject)
    resetState();
    alert("Fund Information Saved");
  };

  const searchData = (text: string) => {
    setSearchText(text);
    console.log(text);
  }
  return (
    <View style={styles.container}>
      <CommonHeader title={"Fund Settings"} />

      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.search}
        />
        <TextInput style={styles.searchText}
          placeholder="Search by name ,number or UPI ID"
          value={searchText}
          onChangeText={(text) => searchData(text)}
        />
      </View>
      <View style={styles.card}>
        <AddFundCustomFlatList data={fundData} />
      </View>

      <CustomButton pressEvent={"add_fund"} getModalopen={getModalopen} />
      <Modal
        isVisible={modalOpen}
        backdropOpacity={0.2}
        style={styles.modaView}
      >
        <View style={styles.mainView}>
          <View style={styles.modalTopView}>
            <Text style={styles.payable}>Fund Details</Text>
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
          <View style={styles.divider}></View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Fund Name"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(name) => setFundName(name)}
                  value={fundName}
                />
              </View>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Fund Type"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  onChangeText={(type) => setFundType(type)}
                  value={fundType}
                />
              </View>
            </View>
          </View>
          <View style={styles.bankView}>
            <View style={styles.bankLeftView}>
              <View style={{ marginLeft: moderateScale(15) }}>
                <View style={styles.upi_view}>
                  <Text style={styles.bankAccount}>{"Balance"}</Text>
                </View>
                <TextInput
                  style={styles.bankAccount}
                  keyboardType="number-pad"
                  onChangeText={(amount) => setFundAmount(Number(amount))}
                  value={String(fundAmount)}
                />
              </View>
            </View>
          </View>
          {fundType === "Credit Card" ?
            <View style={styles.bankView}>
              <View style={styles.bankLeftView}>
                <View style={{ marginLeft: moderateScale(15) }}>
                  <View style={styles.upi_view}>
                    <Text style={styles.bankAccount}>{"Limit"}</Text>
                  </View>
                  <TextInput
                    style={styles.bankAccount}
                    keyboardType="number-pad"
                    onChangeText={(amount) => setCreditAmount(Number(amount))}
                    value={creditAmount? String(creditAmount): "0"}
                  />
                </View>
              </View>
            </View>
            : null}
          <TouchableOpacity style={styles.confirmPayNow} onPress={addFunds}>
            <Text style={styles.title}>{"Add Fund"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Funds;
