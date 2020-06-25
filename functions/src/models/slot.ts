import { firestore } from 'firebase-admin'
import { SLOTS_DOC } from '../constants'

export class SlotClass {
  public getSlots(): Promise<FirebaseFirestore.DocumentSnapshot> {
    return firestore().doc(SLOTS_DOC).get()
  }
}

export const Slot = new SlotClass()
