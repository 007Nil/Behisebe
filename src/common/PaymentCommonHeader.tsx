import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface PaymentCommonHeaderProps {
  headerTitle: string
}

const PaymentCommonHeader = ({ headerTitle }: PaymentCommonHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.subHeader}>
        <TouchableOpacity style={styles.backBtn}>
          {/* <Image
            source={require("../images/left.png")}
            style={styles.backIcon}
          /> */}
        </TouchableOpacity>
        <Text style={styles.title}> {headerTitle}</Text>
        <TouchableOpacity style={styles.backBtn}>
          {/* <Image
            source={require("../images/help.png")}
            style={styles.backIcon}
          /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentCommonHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: verticalScale(85),
    backgroundColor: "purple",
    justifyContent: "flex-end",
  },
  subHeader: {
    width: "100%",
    height: verticalScale(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(15),
  },
  backBtn: {
    width: scale(50),
    height: scale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: scale(24),
    height: scale(24),
    tintColor: "white",
  },
  title: {
    color: "white",
    fontSize: moderateScale(20),
  },
});
