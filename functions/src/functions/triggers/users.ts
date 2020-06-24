import { auth } from 'firebase-functions'
// import { firestore } from 'firebase-functions'
// import { User } from '../../types'
// import { Logger } from '../../utils'

export const userCreated = auth.user().onCreate((user) => {
  console.log('in userCreated', user)

  return
})
