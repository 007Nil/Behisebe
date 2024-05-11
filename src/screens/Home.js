import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

import CommonHeader from "../common/CommonHeader";

const Home = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle={'light-content'} /> */}
      <CommonHeader />
      <ScrollView>
        <View style={styles.updateCard}>
          <View style={styles.updateTopView}>
            <Image source={require("../images/logo.png")} style={styles.logo} />
            <View>
              <Text style={styles.updateTitle}>App Update Available</Text>
              <Text style={styles.updateMsg}>
                {
                  "We need fixed some issues and added some cool feaures in this update"
                }
              </Text>
            </View>
          </View>
          <View style={styles.updateBtnView}>
            <Text style={styles.later}>LATER</Text>
            <TouchableOpacity style={styles.update}>
              <Text style={styles.updateText}>UPDATE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require("../images/phone_pay_banner.png")}
          style={styles.banner}
        />
        <View style={styles.moneyTransferCard}>
          <Text style={styles.heading}>Money Transfers</Text>
          <View style={styles.transferView}>
            <TouchableOpacity style={styles.transferTab}>
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/user.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>To Mobile Number</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/bank2.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"To Bank/\nUPI ID"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/reload.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"To Self Account"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/bank.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Check\nBalance"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.otherOptions}>
          <TouchableOpacity style={styles.otherOptionTab}>
            <Image
              source={require("../images/wallet.png")}
              style={styles.icons}
            />
            <Text style={styles.otherOptionText}>PhonePe Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherOptionTab}>
            <Image
              source={require("../images/gift.png")}
              style={styles.icons}
            />
            <Text style={styles.otherOptionText}>PhonePe Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherOptionTab}>
            <Image
              source={require("../images/speaker.png")}
              style={styles.icons}
            />
            <Text style={styles.otherOptionText}>Refer & Get 100</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.rechargeAndBills,
            { marginBottom: moderateVerticalScale(100) },
          ]}
        >
          <Text style={styles.heading}>Recharge & Pay Bills</Text>
          <View style={styles.transferView}>
            <TouchableOpacity style={styles.transferTab}>
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../images/mobile.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Mobile Recharge"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../images/satellite-dish.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"DTH"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../images/bulb.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Electricity"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../images/credit-card.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Credit Card\nPayment"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transferView}>
            <TouchableOpacity style={styles.transferTab}>
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../images/renewable.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Rent Payment"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../images/personal.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Loan Repayment"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={[styles.transferCard, { backgroundColor: "white" }]}>
                <Image
                  source={require("../images/gas-tank.png")}
                  style={[
                    styles.icons,
                    {
                      tintColor: "purple",
                      width: scale(30),
                      height: scale(30),
                    },
                  ]}
                />
              </View>
              <Text style={styles.tranferText}>{"Book Cylinder"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}>
              <View style={[styles.transferCard]}>
                <Image
                  source={require("../images/next.png")}
                  style={[styles.icons]}
                />
              </View>
              <Text style={styles.tranferText}>{"See All"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  icons: {
    width: scale(22),
    height: scale(22),
    tintColor: "white",
  },
  updateCard: {
    width: "90%",
    height: verticalScale(100),
    borderRadius: moderateScale(10),
    alignSelf: "center",
    marginTop: moderateVerticalScale(10),
    shadowRadius: 10,
    shadowColor: "rgba(0,0,0,.5)",
    backgroundColor: "#f2f2f2",
    shadowOffset: { x: 0, y: 1 },
  },
  updateCard: {
    width: "94%",

    borderRadius: moderateScale(5),
    alignSelf: "center",
    marginTop: moderateVerticalScale(10),
    backgroundColor: "white",
  },
  updateTopView: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    marginTop: moderateVerticalScale(20),
  },
  logo: {
    width: scale(30),
    height: scale(30),
  },
  updateTitle: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    marginLeft: moderateScale(10),
  },
  updateMsg: {
    fontSize: 14,
    width: "70%",
    marginLeft: moderateScale(10),
    color: "#6e6e6e",
  },
  updateBtnView: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(15),
    alignItems: "center",
    marginRight: moderateScale(20),
  },
  later: {
    color: "purple",
    fontWeight: "600",
    fontSize: moderateScale(16),
  },
  update: {
    backgroundColor: "purple",
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(10),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    borderRadius: moderateScale(20),
    marginLeft: moderateScale(20),
  },
  updateText: {
    color: "white",
    fontWeight: "600",
    fontSize: moderateScale(16),
  },
  banner: {
    width: "94%",
    height: verticalScale(100),
    alignSelf: "center",
    marginTop: moderateVerticalScale(10),
    borderRadius: moderateScale(10),
  },
  moneyTransferCard: {
    width: "94%",
    height: verticalScale(130),
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: moderateVerticalScale(10),
    borderRadius: moderateScale(10),
  },
  heading: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginLeft: moderateScale(15),
    marginTop: moderateVerticalScale(15),
  },
  transferView: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: moderateScale(20),
  },
  transferTab: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  transferCard: {
    width: scale(36),
    height: scale(36),
    borderRadius: moderateScale(10),
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  tranferText: {
    marginTop: moderateScale(5),
    textAlign: "center",
  },
  otherOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "94%",
    marginTop: moderateScale(10),
    alignSelf: "center",
  },
  otherOptionTab: {
    width: "31%",
    height: verticalScale(60),
    backgroundColor: "#277be8",
    borderRadius: moderateScale(18),
    justifyContent: "center",
    alignItems: "center",
  },
  otherOptionText: {
    color: "white",
    fontWeight: "600",
    marginTop: moderateScale(10),
  },
  rechargeAndBills: {
    backgroundColor: "white",
    borderRadius: moderateScale(5),
    marginTop: moderateVerticalScale(10),
    alignSelf: "center",
    height: verticalScale(200),
    width: "94%",
  },
});
