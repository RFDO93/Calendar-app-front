
export const CalendarEvent = ({event}) => {
  const {title, user} = event;
  const {name:userName} = user

  return (
    <>
      <strong>{title}</strong>
      <span> - {userName}</span>
    </>
  )
}
