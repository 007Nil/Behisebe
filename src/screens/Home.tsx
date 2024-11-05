import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { useNavigation } from '@react-navigation/native'
import HomeCommonHeader from "../common/HomeCommonHeader";
import { type StackNavigation } from "../navigation/AppNavigator";
import styles from "./styles";
import { CustomBarChart } from "../component";
const Home = () => {
  const { navigate } = useNavigation<StackNavigation>();
  return (
    <View style={styles.container}>
      <HomeCommonHeader title={"Home"} />
      <ScrollView>
        <View
          style={[
            styles.moneyTransferCard,
            {
              marginBottom: moderateVerticalScale(10),
              marginTop: moderateVerticalScale(20),
            },
          ]}
        >
          <Text style={styles.heading}>Money Transfers</Text>
          <View style={styles.transferView}>
            <TouchableOpacity
              style={styles.transferTab}
              onPress={() => {
                navigate("AddExpense");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/user.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Debit/Expense"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                navigate("AddCredit");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/bank2.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Credit/Earnings"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                navigate("ToSelfTransfer");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/reload.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"To Self Transfer"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                navigate("CheckBalance");
              }}
            >
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

        <View
          style={[
            styles.moneyTransferCard,
            {
              marginBottom: moderateVerticalScale(10),
              marginTop: moderateVerticalScale(10),
            },
          ]}
        >
          <View style={styles.transferView}>
            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                navigate("ExpenseDetails");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/bank.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Expense\n Details"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                navigate("CreditDetails");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/bank2.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Credit/Details"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            styles.rechargeAndBills,
            { marginBottom: moderateVerticalScale(10) },
          ]}
        >
          <Text style={styles.heading}>Expense Charts</Text>
          <CustomBarChart />
        </View>
        <View
          style={[
            styles.rechargeAndBills,
            { marginBottom: moderateVerticalScale(10) },
          ]}
        >
          <Text style={styles.heading}>More Charts</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;