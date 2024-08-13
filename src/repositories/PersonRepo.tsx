
import { OpenRealm } from "./OpenConnection";

async function getAllPersons() {
  const realm = await OpenRealm();
  return realm.objects("Persons");
}

async function savePersonDetails(personObject) {
  const realm = await OpenRealm();

  try {
    realm.write(() => {
      realm.create("Persons", {
        _id: personObject._id,
        person_name: personObject.person_name,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function getPersonDetailsById(person_id) {
  try {
    const realm = await OpenRealm();
    const personDetailsData = realm.objects("Persons");
    const filterData = personDetailsData.filtered("_id = $0",person_id);
    return filterData[0];
  } catch (error) {
    console.log(error);
  }
}

async function updatePersonDetails(personObject){
  try{
    const realm = await OpenRealm();
    realm.write(() => {
      let data = realm.objectForPrimaryKey('Persons', personObject._id);
      data.person_name =personObject.person_name;

    });
  }catch (error){
    console.log(error)
  }
}

export { getAllPersons, savePersonDetails, getPersonDetailsById, updatePersonDetails };
