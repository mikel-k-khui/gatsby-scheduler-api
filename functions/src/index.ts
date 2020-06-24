/*
 * The index.js file must includes all cloud functions to be deployed.
 * This uses the TS conventions of import/export to make the codes more readable and tracable
 * You have to initialize the 'admin' object here, so any subsequent calls will be setup
 */
import * as admin from 'firebase-admin'
admin.initializeApp({
  credential: admin.credential.cert()
})

export { getAppointments, getResources } from './functions/callable'
export { userCreated } from './functions/triggers'
