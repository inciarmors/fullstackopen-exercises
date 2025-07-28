const Notification = ({ message }) => {
  if (!message) return null

  const style = {
    color: message.isError ? 'red' : 'green',
    background: '#eee',
    fontSize: 20,
    border: `2px solid ${message.isError ? 'red' : 'green'}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={style}>{message.text}</div>
}

export default Notification
