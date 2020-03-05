const checkPasscode = (users, username, passcode) => {
  return (
    users.filter(x => (x.name === username && x.passcode === Number.parseFloat(passcode)))
  )
}
export default checkPasscode
