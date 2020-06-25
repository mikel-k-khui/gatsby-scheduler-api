import { startOfWeek } from 'date-fns'

// this function determines the start of current week
// and end of next week date
export function fortnight(today: Date) {
  return {
    startOfWeek: startOfWeek(today, { weekStartsOn: 1 }),
    endOfNextWeek: startOfWeek(new Date(today.getDate() + 7), {
      weekStartsOn: 5
    })
  }
}
