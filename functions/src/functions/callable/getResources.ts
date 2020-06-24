import { https } from 'firebase-functions'

/*
 * A callable function is the end point for web app to
 * This should pass through the controller for user validation first
 * Then it should apply to the business logic module
 */

export const getResources = https.onCall((data, context) => {
  console.log('in getResources')
})
