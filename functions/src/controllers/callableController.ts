import { v4 as uuid } from 'uuid'
import { auth, firestore } from 'firebase-admin'
import { Logger } from '../utils'

/* eslint @typescript-eslint/no-explicit-any: 0 */
export class CallableController {
  // field
  batch: FirebaseFirestore.WriteBatch
  promises: Array<Promise<any>>
  startTime: Date
  uid: string | undefined
  uuid: string

  // constructor
  constructor() {
    this.batch = firestore().batch()
    this.promises = []
    this.startTime = new Date()
    this.uid = undefined
    this.uuid = uuid()
  }

  public async checkAuthorization(contextUid: string): Promise<void> {
    try {
      const userRecord: auth.UserRecord = await auth().getUser(contextUid)
      this.uid = userRecord.uid
    } catch (err) {
      Logger.error(err, 'userRecord not found', 'CONTROLLER')
      throw err
    }
  }

  async commit(): Promise<FirebaseFirestore.WriteResult[]> {
    const timeDifferenceInSeconds = (startTime: Date, endTime: Date) =>
      (endTime.getTime() - startTime.getTime()) / 1000
    const results: FirebaseFirestore.WriteResult[] = await this.batch.commit()
    const endTime: Date = new Date()

    Logger.log(
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
