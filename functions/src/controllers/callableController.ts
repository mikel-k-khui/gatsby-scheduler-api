import { v4 as uuid } from 'uuid'
import { firestore } from 'firebase-admin'
// import { Logger } from '../utils'

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

  async commit(): Promise<FirebaseFirestore.WriteResult[]> {
    const timeDifferenceInSeconds = (startTime: Date, endTime: Date) =>
      (endTime.getTime() - startTime.getTime()) / 1000
    const results: FirebaseFirestore.WriteResult[] = await this.batch.commit()
    const endTime: Date = new Date()

    console.log(
      this.uuid,
      'CallableController',
      `completed in ${timeDifferenceInSeconds(
        endTime,
        this.startTime
      )}s at ${endTime.toString()}`
    )
    return results
  }
}
