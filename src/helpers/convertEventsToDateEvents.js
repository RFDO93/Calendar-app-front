import { parseISO,getTime } from "date-fns"

export const convertEventsToDateEvents = (events = []) => {
  return events.map(event => {
    event.start = getTime(parseISO(event.start))
    event.end = getTime(parseISO(event.end))

    return event
  })
}
