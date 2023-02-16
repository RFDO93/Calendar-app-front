import { addHours, format, getTime } from "date-fns"
import { useUiStore } from "../../hooks"
import { useCalendarStore } from "../../hooks/useCalendarStore"

export const FabDelete = () => {

  const {startDeletingEvent,hasEventSelected} = useCalendarStore()

  const handleClickDelete = () => {
    startDeletingEvent()
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
