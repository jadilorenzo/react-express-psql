const getDisplayMessages = (database, allUsers, currentRoom) => {
  return (
    database
      .filter(x => x.rid === currentRoom.rid)
      .map((messageRow, index) => ({
        name: allUsers.filter(user => user.uid === messageRow.uid)[0].name,
        message: messageRow.message,
        ref: (index === database.filter(message => message.rid === currentRoom.rid).length - 1)
      })
    )
  )
}

export default getDisplayMessages;
