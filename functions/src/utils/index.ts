import { firestore } from 'firebase'
export { Logger } from './Logger'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sanitizeTimestamp(target: any): any {
  if (Array.isArray(target)) {
    return target.map((item) => sanitizeTimestamp(item))
  } else if (target instanceof FirebaseFirestore.Timestamp) {
    return target.toDate()
  } else if (typeof target === 'object') {
    const transformed: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(target)) {
      transformed[key] = sanitizeTimestamp(value)
    }
    return transformed
  }
  return target
}

export function getDataFromQuery(
  queryData: FirebaseFirestore.QuerySnapshot
): FirebaseFirestore.DocumentData[] {
  return queryData.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) =>
    doc.data()
  )
}

export function sanitizeDate(target: any): any {
  if (Array.isArray(target)) {
    return target.map((item) => sanitizeTimestamp(item))
  } else if (target instanceof Date) {
    return firestore.Timestamp.fromDate(target)
  } else if (typeof target === 'object') {
    const transformed: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(target)) {
      transformed[key] = sanitizeTimestamp(value)
    }
    return transformed
  }
  return target
}
