import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useAuthStore, useUiStore } from '../../hooks'
import { useCalendarStore } from '../../hooks/useCalendarStore'

export const CalendarPage = () => {
  const {openDateModal} = useUiStore()
  const {user} = useAuthStore()
  const {events,setActiveEvent,startLoadingEvents} = useCalendarStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  
  useEffect(() => {
    startLoadingEvents()    
  }, [])
  

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = (user?.uid === event?.user?._id) || (user?.uid === event?.user?.id)
    
    const style = {
      backgroundColor:isMyEvent ? '#347CF7' : '#465660',
      borderRadius:'0px',
      opacity:0.8,
      color:'#ffffff'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView',event)
    setLastView(event)
  }

  return (
    <>
      <Navbar />
    
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event:CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}
