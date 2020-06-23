/*
 * The index.js file must includes all cloud functions to be deployed.
 * This uses the TS conventions of import/export to make the codes more readable and tracable
 */
export { getAppointments, getUsers } from './functions/callable'
export { userCreated } from './functions/firestoreTriggers'
