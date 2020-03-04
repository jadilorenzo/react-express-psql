import getDisplayMessages from '../methods/GetDisplayMessages'

it('gets display messages', () => {
  expect(
    getDisplayMessages(
      [{rid: 'rid', uid: 'uid', message: 'I just tried BROWNIES!!!'}],
      [{uid: 'uid', name: 'Billy Bob'}],
      {rid:'rid'}
    ).map(message => message.message)
  ).toContain('I just tried BROWNIES!!!')
})
