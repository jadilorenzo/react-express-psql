const getAccessibleRooms = (rooms, userId) => {
  return rooms.filter((room) => !(JSON.parse(room.users.replace('{', '[').replace('}', ']')).includes(userId)))
}

export default getAccessibleRooms
