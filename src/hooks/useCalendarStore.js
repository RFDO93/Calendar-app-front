import { getTime } from "date-fns"
import {useMemo} from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

  const dispatch = useDispatch()
  const {
    events,
    activeEvent,
  } = useSelector(store => store.calendar)

  const listEvents = useMemo(() => {
    return events.map(calendarEvent =>  {
      return {...calendarEvent,
        start: new Date(calendarEvent.start),
        end: new Date(calendarEvent.end),
      }
    })
  }, [events])

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent({...calendarEvent,
      start:getTime(new Date(calendarEvent.start)),
      end:getTime(new Date(calendarEvent.end)),
    }))
  }

  const startSavingEvent = async (calendarEvent) => {
    if(calendarEvent._id) {
      dispatch(onUpdateEvent({...calendarEvent}))
    } else {
      dispatch(onAddNewEvent({
        ...calendarEvent,
        _id: new Date().getTime()
      }))
    }
  }

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent())
  }

  return {
    events:listEvents,
    activeEvent,
    hasEventSelected: !!activeEvent?._id,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
}