import { Appointment } from './appointment'
import { getDataFromQuery } from '../../utils'
import { https } from 'firebase-functions'
import { CallableController } from '../../controllers/callableController'
// import { AppointmentPayload } from '../../types'

export async function getAppointments(
  today: Date,
  controller: CallableController
): Promise<FirebaseFirestore.DocumentData[] | undefined> {
  const AppointmentInstance: Appointment = new Appointment()

  // TOD: add business logics to check
  const appQuerySnap: FirebaseFirestore.QuerySnapshot = await AppointmentInstance.getFortnight(
    today,
    controller.uuid
  )
  if (appQuerySnap.size > AppointmentInstance.maxDailyAppointments * 10) {
    throw new https.HttpsError(
      'data-loss',
      'Excessive appointments',
      'Appointment CRUD'
    )
  }

  return appQuerySnap.size > 0 ? getDataFromQuery(appQuerySnap) : undefined
}
