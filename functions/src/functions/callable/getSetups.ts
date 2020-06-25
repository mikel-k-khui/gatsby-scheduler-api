import { https } from 'firebase-functions'
import { getDataFromQuery, Logger, sanitizeTimestamp } from '../../utils'
import { CallableController } from '../../controllers/callableController'
import { ROLES } from '../../constants'
import { Slot, User } from '../../models'
/*
 * A callable function is the end point for web app to
 * This should pass through the controller for user validation first
 * Then it should apply to the business logic module
 */

export const getSetups = https.onCall(async (data, context) => {
  const controller: CallableController = new CallableController()
  try {
    // check there is no content in data
    if (Object.keys(data).length !== 0 || !context.auth?.uid) {
      Logger.error(controller.uuid, 'data should be empty', 'GETSETUPS')
      throw new https.HttpsError('invalid-argument', 'Incorrect requests')
    }

    controller.checkAuthorization(context.auth.uid)

    // get queries
    const user = new User()
    controller.promises.push(user.getAllByRole(ROLES.resource))
    controller.promises.push(Slot.getSlots())

    const [resourceUsers, slots] = await Promise.all(controller.promises)

    return {
      slots: sanitizeTimestamp({ ...slots.data() }),
      resources: getDataFromQuery(resourceUsers)
    }
  } catch (err) {
    Logger.error(controller.uuid, err, 'GETSETUPS')
    throw new https.HttpsError('unavailable', controller.uuid)
  }
})
