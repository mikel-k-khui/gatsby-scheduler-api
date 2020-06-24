import { auth } from 'firebase-functions'
import { firestore } from 'firebase-functions'
import { User } from '../../types'
// import { Logger } from '../../utils'

export const userCreated = auth.user().onCreate
  .onCreate(user => {
    const userData = <User>snap

    firestore.
    try {
      console.log('new authenticated user added with details:', user)
    } catch (err) {
      throw err
    }

    return
  })
