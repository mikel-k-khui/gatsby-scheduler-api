import { firestore } from 'firebase-functions'
import { auth } from 'firebase-admin'
import { User } from '../../types'
// import { Logger } from '../../utils'

export const userCreated = firestore
  .document('users/{userId')
  .onCreate((snap, context) => {
    console.log('What is in the snap', snap, 'and context?', context)
    const userData = <User>snap

    try {
      auth().createUser({
        disabled: true,
        email: userData.email,
        emailVerified: false,
        password: '',
        uid: userData.id
      })
    } catch (err) {
      throw err
    }

    return
  })
