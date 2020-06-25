import { firestore } from 'firebase-admin'
import { APPOINTMENTS_COL } from '../../constants'
import { fortnight } from './utils'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export class Appointment {
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

  public getFortnight(today: Date): Promise<FirebaseFirestore.QuerySnapshot> {
    const { startOfWeek, endOfNextWeek } = fortnight(today)
    return this.getCollection().where('role', '>=', ).get()
  }
}
