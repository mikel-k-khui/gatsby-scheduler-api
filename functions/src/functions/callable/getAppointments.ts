import { https } from 'firebase-functions'
import { Logger } from '../../utils'
import { CallableController } from '../../controllers/callableController'
import { getAppointments as getAppointmentsLogic } from '../../models'
/*
 * A callable function is the end point for web app to
 * This should pass through the controller for user validation first
 * Then it should apply to the business logic module
 */

export const getAppointments = https.onCall(async (data, context) => {
  const controller: CallableController = new CallableController()
  try {
    // TODO: add hapi.joi for validation

    console.log('DEBUG :: what is in data?', data)
    // check there is no content in data
    if (Object.keys(data).length !== 1 || !context.auth?.uid) {
      Logger.error(controller.uuid, 'data is incorrect', 'GETSETUPS')
      throw new https.HttpsError('invalid-argument', 'Incorrect requests')
    }

    controller.checkAuthorization(context.auth.uid)
    return getAppointmentsLogic(data?.today)
  } catch (err) {
    Logger.error(controller.uuid, err, 'GETSETUPS')
    throw new https.HttpsError('unavailable', controller.uuid)
  }
})
