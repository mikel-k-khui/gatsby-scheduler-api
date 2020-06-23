import { v4 as uuid } from 'uuid'
import { firestore } from 'firebase-admin'

export class CallableController {
  // field
  batch: FirebaseFirestore.WriteBatch
  email: string
  startTime: Date
  userId: string | undefined
  uuid: string

  // constructor
  constructor(email: string) {
    this.batch = firestore().batch()
    this.email = email
    this.startTime = new Date()
    this.userId = this.checkAuthorization()
    this.uuid = uuid()
  }

  checkAuthorization(): string | undefined {
    return '1234'
  }

  log(): void {
    console.log()
  }

  commit(): Promise<FirebaseFirestore.WriteResult[]> {
    return this.batch.commit()
  }
}
