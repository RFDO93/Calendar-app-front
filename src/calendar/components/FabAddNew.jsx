import { addHours, format, getTime } from "date-fns"
import { useUiStore } from "../../hooks"
import { useCalendarStore } from "../../hooks/useCalendarStore"

export const FabAddNew = () => {

  const {openDateModal} = useUiStore()
  const {setActiveEvent} = useCalendarStore()

  const handleClickNew = () => {
    setActiveEvent({
      title:'',
      notes:'',
      start:getTime(new Date()),
      end: getTime(addHours(new Date(),2)),
      bgColor: '#fafafa',
      user:{
        _id:'123',
        name:'Fernando'
      }
    })
    openDateModal()
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={handleClickNew}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
