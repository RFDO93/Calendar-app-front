import { useAuthStore } from "../../hooks"

export const CalendarEvent = ({event}) => {
  const {user} = useAuthStore()
  const {title} = event

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}
