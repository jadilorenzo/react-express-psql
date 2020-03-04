import GetUser from './GetUser'

it('grabs correct user', () => {
  expect(GetUser([{passcode: 3.14, name: 'Pi'}], 'Pi', '3.14').length > 0).toBe(true)
})
