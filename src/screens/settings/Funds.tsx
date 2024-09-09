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

const styles = require("./styles")

// Services
// import { SaveFundDetails, getFundDetails } from "../../services/FundServices";
import { SaveFundDetailsService } from "../../services/FundDetailsServices";
import CustomFlatList from "../../component/CustomFlatList";
import { CustomButton } from "../../component";
import { FundDetailsModel } from "../../model";

const Funds = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [fundData, setFundData] = useState<FundDetailsModel[]>([]);
  const [fundName, setFundName] = useState<string>("");
  const [fundType, setFundType] = useState<string>("");
  const [fundAmount, setFundAmount] = useState<number>(0);
  // useEffect(() => {
  //   getFundDetails().then( data => setFundData(data))
  // },[]);
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
      alert("Amount cannot 0");
      return;
    }
    let fundObject = {
      fund_name: fundName,
      fund_type: fundType,
      balance: fundAmount,
      is_active: true,
    };
    let newFundDetails = [...fundData, fundObject];
    await SaveFundDetailsService(fundObject);
    setFundData(newFundDetails);
    console.log(fundObject)
    resetState();
    alert("Fund Information Saved");
  };
  return (
    <View style={styles.container}>
      <CommonHeader title={"Fund Settings"} />

      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.search}
        />
        <Text style={styles.searchText}>Search by name ,number or UPI ID</Text>
      </View>
      <View style={styles.card}>
        <CustomFlatList data={fundData} flatLisyType={"fundDetails"} edit_type={"Fund"} />
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
                  <Text style={styles.bankAccount}>{"Amount / Limit"}</Text>
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

          <TouchableOpacity style={styles.confirmPayNow} onPress={addFunds}>
            <Text style={styles.title}>{"Add Fund"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Funds;
