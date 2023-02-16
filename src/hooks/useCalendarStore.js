import { getTime } from "date-fns"
import {useMemo} from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarApi } from '../api'
import { convertEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"

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

    try {
      
      if(calendarEvent.id) {
  
        const {data} = await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        )

        dispatch(onUpdateEvent({...data.evento,user:{id:data.evento.user}}))
  
      } else {
  
        const {data} = await calendarApi.post(
          '/events',
          calendarEvent
        )
  
        dispatch(onAddNewEvent(data.evento))
  
      }
    
    } catch (error) {
      console.log(error)
      Swal.fire(
        'Error al gestionar el evento', 
        error?.response?.data?.msg || "Problema al gestionar el evento",
        'error'
      )
    }
  }

  const startDeletingEvent = async () => {

    try {
      const {data} = await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      console.log(error)
      Swal.fire(
        'Error al eliminar', 
        error?.response?.data?.msg || "Problema al eliminar el evento",
        'error'
      )
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.eventos)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log(error)
      Swal.fire(
        'Error al consultar los eventos', 
        error?.response?.data?.msg || "Problema al consultar el listado de eventos",
        'error'
      )
    }
  }

  return {
    events:listEvents,
    activeEvent,
    hasEventSelected: !!activeEvent?.id,

    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}