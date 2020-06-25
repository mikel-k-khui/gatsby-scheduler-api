import { firestore } from 'firebase-admin'
import { USERS_COL } from '../constants'

// Start writing Firebase Functions
// https://googleapis.dev/nodejs/firestore/latest/index.html
//

export class User {
  static getCollection(): FirebaseFirestore.CollectionReference {
    return firestore().collection(USERS_COL)
  }

  static getDoc(
    id: string | undefined = undefined
  ): FirebaseFirestore.DocumentReference {
    return !id ? this.getCollection().doc() : this.getCollection().doc(id)
  }

  getData(id: string): Promise<FirebaseFirestore.DocumentSnapshot> {
    return User.getDoc(id).get()
  }

  async getByUid(
    uid: string
  ): Promise<FirebaseFirestore.DocumentData | undefined> {
    const userSnap: FirebaseFirestore.QuerySnapshot = await User.getCollection()
      .where('uid', '==', uid)
      .get()

    return userSnap.size === 1 ? userSnap.docs[0].data() : undefined
  }

  getAllByRole(role: string): Promise<FirebaseFirestore.QuerySnapshot> {
    return User.getCollection().where('role', '==', role).get()
  }
}
