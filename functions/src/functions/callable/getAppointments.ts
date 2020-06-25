import { https } from 'firebase-functions'
import { getDataFromQuery, Logger, sanitizeTimestamp } from '../../utils'
import { CallableController } from '../../controllers/callableController'
import { firestore } from 'firebase-admin'
import { ROLES, SLOTS_DOC, USERS_COL } from '../../constants'
/*
 * A callable function is the end point for web app to
 * This should pass through the controller for user validation first
 * Then it should apply to the business logic module
 */

export const getAppointments = https.onCall(async (data, context) => {
  const controller: CallableController = new CallableController()
  try {
    // TODO: add hapi.joi for validation

    // check there is no content in data
    if (Object.keys(data).length !== 1 || !context.auth?.uid) {
      Logger.error(controller.uuid, 'data is incorrect', 'GETSETUPS')
      throw new https.HttpsError('invalid-argument', 'Incorrect requests')
    }

    controller.checkAuthorization(context.auth.uid)

    // get queries
    controller.promises.push(firestore().doc(SLOTS_DOC).get())
    controller.promises.push(
      firestore()
        .collection(USERS_COL)
        .where('role', '==', ROLES.resource)
        .get()
    )

    const [slots, resourceUsers] = await Promise.all(controller.promises)

    return {
      slots: sanitizeTimestamp({ ...slots.data() }),
      resources: getDataFromQuery(resourceUsers)
    }
  } catch (err) {
    Logger.error(controller.uuid, err, 'GETSETUPS')
    throw new https.HttpsError('unavailable', controller.uuid)
  }
})
