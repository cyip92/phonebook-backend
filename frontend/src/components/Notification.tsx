const Notification = ({ text, isError } : { text: string, isError: boolean }) => {
  // Since we keep the notification box on the screen all the time, we leave it a "neutral" black
  // when it's empty and only (conditionally) give it a different color when it has text inside
  let color = "";
  if (text === "") color = "black";
  else if (isError) color = "red";
  else color = "green";

  const style = { color };

  return (
    <div
      className="notification"
      style={style}
    >
      { text }
    </div>
  )
};

export default Notification;
