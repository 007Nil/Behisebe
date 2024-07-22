import { getAllPersons,savePersonDetails, getPersonDetailsById, updatePersonDetails } from "../repositories/PersonRepo";

async function getAllPersonsService(){
    return await getAllPersons();
}

async function savePersonDetailsService(personObj){
    await savePersonDetails(personObj);
    return;
}

async function getPersonDetailsByIdService(person_id){
    await getPersonDetailsById(person_id);
    return;
}

async function updatePersonDetailsService(personObj){
    await updatePersonDetails(personObj);
    return;
}

export { getAllPersonsService, savePersonDetailsService, getPersonDetailsByIdService, updatePersonDetailsService};