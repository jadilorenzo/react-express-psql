import getAccessibleRooms from '../methods/GetAccessibleRooms'

it('gets the accessible rooms', () => {
  expect(getAccessibleRooms([{name: 'Room', users: '{"id"}'}], 'differentId')[0].name).toBe('Room')
})
