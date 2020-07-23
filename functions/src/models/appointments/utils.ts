import { startOfWeek } from 'date-fns'

// this function determines the start of current week
// and end of next week date
export function fortnight(today: Date) {
  console.log('DEBUG :: what is today', today, ' and', typeof today)
  return {
    startOfWeek: startOfWeek(today, { weekStartsOn: 1 }),
    endOfNextWeek: startOfWeek(new Date(today.getDate() + 7), {
      weekStartsOn: 5
    })
  }
}
