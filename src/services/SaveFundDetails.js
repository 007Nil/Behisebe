

const SaveFundDetails =  async (fundObject) => {
  // const openRealm = async () => {
  //   return await Realm.open({
  //     schema: [FundDetailsModel]
  //   });
  // };
  // const realm = await openRealm();
  // realm.write(() => {
  //   realm.create("FundDetails", {
  //     _id: fundObject._id,
  //     fund_name: fundObject.fund_name,
  //     fund_type: fundObject.fund_type,
  //     balance: fundObject.balance,
  //     is_active: fundObject.is_active
  //   });
  // });
  console.log(fundObject)
  // const openRealm = async () => {
  //   const realm = await Realm.open({ schema: [UserSchema] });

  //   // Create sample user
  //   realm.write(() => {
  //     realm.create("User", { id: 1, name: "John Doe", age: 30 });
  //   });
  // };
  // return console.log(fundObject);
};

export default SaveFundDetails;
