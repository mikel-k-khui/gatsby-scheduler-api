import { firestore } from 'firebase-admin'
import { APPOINTMENTS_COL } from '../../constants'
import { fortnight } from './utils'
import { sanitizeDate } from '../../utils'
import { Logger } from '../../utils/Logger'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export class Appointment {
  maxDailyAppointments: number

  constructor() {
    this.maxDailyAppointments = 24
  }

  private getCollection(): FirebaseFirestore.CollectionReference {
    return firestore().collection(APPOINTMENTS_COL)
  }

  public getDoc(
    id: string | undefined = undefined
  ): FirebaseFirestore.DocumentReference {
    return !id ? this.getCollection().doc() : this.getCollection().doc(id)
  }

  public getData(id: string): Promise<FirebaseFirestore.DocumentSnapshot> {
    return this.getDoc(id).get()
  }

  public async getById(
    id: string
  ): Promise<FirebaseFirestore.DocumentData | undefined> {
    const appSnap: FirebaseFirestore.QuerySnapshot = await this.getCollection()
      .where('id', '==', id)
      .get()

    return appSnap.size === 1 ? appSnap.docs[0].data() : undefined
  }

  public async getFortnight(
    today: Date,
    uuid: string
  ): Promise<FirebaseFirestore.QuerySnapshot> {
    const { startOfWeek, endOfNextWeek } = fortnight(today)
    const startOfWeekTimestamp: firestore.Timestamp = sanitizeDate(startOfWeek)

    console.log(
      'DEBUG :: what is startOfWeek',
      startOfWeek,
      'and timestampe',
      startOfWeekTimestamp
    )
    let result

    try {
      result = await this.getCollection()
        .where('date', '>=', startOfWeekTimestamp)
        // .where('date', '<=', sanitizeDate(endOfNextWeek))
        .get()
    } catch (err) {
      Logger.error(uuid, 'Cannot get collection by where', 'APPOINTMENT')
    }

    return result
  }
}
