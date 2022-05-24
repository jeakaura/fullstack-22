const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.startsWith('Virhe:'))
      return (
        <div className="error">
          {message}
        </div>
      )
    else
        return (
          <div className="ilmoitus">
            {message}
          </div>
        )
  }
  
  export default Notification
  