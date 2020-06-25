/*
 * The index.js file must includes all cloud functions to be deployed.
 * This uses the TS conventions of import/export to make the codes more readable and tracable
 * You have to initialize the 'admin' object here, so any subsequent calls will be setup
 *
 */

/* eslint camelcase: 0 */

// setup
// https://medium.com/google-cloud/firebase-separating-configuration-from-code-in-admin-sdk-d2bcd2e87de6
import * as admin from 'firebase-admin'

admin.initializeApp()

export { getAppointments, getSetups } from './functions/callable'
export { userCreated } from './functions/triggers'
