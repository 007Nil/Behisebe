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
import { useIsFocused, useNavigation } from '@react-navigation/native'
import HomeCommonHeader from "../common/HomeCommonHeader";
import { type StackNavigation } from "../navigation/AppNavigator";
import styles from "./styles";
import { CustomBarChart } from "../component";
import { useEffect, useState } from "react";
import BarChartModel from "../model/BarChartModel";
import { generateWeeklyBarChartData } from "../services/ChartsServices";
import { dateConvert } from "../utils/AllUtils";
import { getExpenseByDateService } from "../services/ExpenseDetailsServices";
import { getCreditByDateService } from "../services/CreditDetailsServices";
const Home = () => {
  const isFocused = useIsFocused();

  const { navigate } = useNavigation<StackNavigation>();
  const [barChartData, setBarChartData] = useState<BarChartModel[]>();
  const [todayExpesne, setTodayExpense] = useState<number>(0);
  const [todayCredit, setTodayCredit] = useState<number>(0);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(0);
  const [monthlyCredit, setMonthlyCredit] = useState<number>(0);
  const [monthyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [monthlySelfTransfer, setMonthlySelfTransfer] = useState<number>(0);
  const todayDate: Date = new Date();
  useEffect(() => {
    (async () => {
      setBarChartData(await generateWeeklyBarChartData());
      const expenseDetails = await getExpenseByDateService(dateConvert(todayDate), dateConvert(todayDate));
      const creditDetails = await getCreditByDateService(dateConvert(todayDate), dateConvert(todayDate));
      let totalExpense = 0;
      let totalCredit = 0;
      for (const eachExp of expenseDetails) {
        // Exclude the expense reason with id 2 (which is Self Tranfer)
        if (eachExp.expense_reason_id_fk !== 2) {
          totalExpense = totalExpense + Number(eachExp.amount);
        }
      }
      setTodayExpense(totalExpense);

      for (const eachCredit of creditDetails) {
        // Exclude the credit reason with id 1 (which is Self Tranfer)
        if (eachCredit.credit_reason_id_fk !== 1) {
          totalCredit = totalCredit + Number(eachCredit.amount);
        }
      }
      setTodayCredit(totalCredit);
    }
    )()
  }, [todayExpesne, todayCredit]);

  useEffect(() => {
    {
      (async () => {
        if (isFocused) {
          setBarChartData(await generateWeeklyBarChartData());
          const expenseDetails = await getExpenseByDateService(dateConvert(todayDate), dateConvert(todayDate));
          const creditDetails = await getCreditByDateService(dateConvert(todayDate), dateConvert(todayDate));
          let totalExpense = 0;
          let totalCredit = 0;
          for (const eachExp of expenseDetails) {
            totalExpense = totalExpense + Number(eachExp.amount);
          }
          setTodayExpense(totalExpense);

          for (const eachCre of creditDetails) {
            totalCredit = totalCredit + Number(eachCre.amount);
          }
          setTodayCredit(totalCredit);
        }
      }
      )()
    }
  }, [isFocused]);
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
            styles.showDetailsCard,
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
              <Text style={styles.tranferText}>{"Credit\n Details"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                navigate("ExpenseAnalyze");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/bank2.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Expense\n Analyze"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.transferTab}
              onPress={() => {
                navigate("CreditAnalyze");
              }}
            >
              <View style={styles.transferCard}>
                <Image
                  source={require("../images/bank2.png")}
                  style={styles.icons}
                />
              </View>
              <Text style={styles.tranferText}>{"Credit\n Analyze"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            styles.dailyReport,
            { marginBottom: moderateVerticalScale(10) },
          ]}
        >
          <Text style={[styles.heading, { textDecorationLine: "underline" }]}>Daily Details</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: moderateVerticalScale(5) }}>
            <Text style={[styles.heading, { flex: 1 }]}>Expense</Text>
            <Text style={[styles.heading, { flex: 1, textAlign: "right" }]}>{todayExpesne}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: moderateVerticalScale(5) }}>
            <Text style={[styles.heading, { flex: 1 }]}>Credit</Text>
            <Text style={[styles.heading, { flex: 1, textAlign: "right" }]}>{todayCredit}</Text>
          </View>
        </View>

        <View
          style={[
            styles.monthlyReport,
            { marginBottom: moderateVerticalScale(10) },
          ]}
        >
          <Text style={[styles.heading, { textDecorationLine: "underline" }]}>Monthly Details</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: moderateVerticalScale(5) }}>
            <Text style={[styles.heading, { flex: 1 }]}>Expense</Text>
            <Text style={[styles.heading, { flex: 1, textAlign: "right" }]}>{monthlyExpense}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: moderateVerticalScale(5) }}>
            <Text style={[styles.heading, { flex: 1 }]}>Credit</Text>
            <Text style={[styles.heading, { flex: 1, textAlign: "right" }]}>{monthlyCredit}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: moderateVerticalScale(5) }}>
            <Text style={[styles.heading, { flex: 1 }]}>Self Transfer</Text>
            <Text style={[styles.heading, { flex: 1, textAlign: "right" }]}>{monthlySelfTransfer}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: moderateVerticalScale(5) }}>
            <Text style={[styles.heading, { flex: 1 }]}>Investment</Text>
            <Text style={[styles.heading, { flex: 1, textAlign: "right" }]}>{monthyInvestment}</Text>
          </View>
        </View>

        <View
          style={[
            styles.rechargeAndBills1,
            { marginBottom: moderateVerticalScale(10) },
          ]}
        >
          <Text style={styles.heading}>Weekely Expense Charts</Text>
          <CustomBarChart barChartData={barChartData} xwidth={16} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;