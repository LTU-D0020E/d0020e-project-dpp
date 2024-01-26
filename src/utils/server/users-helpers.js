export const userArrayRenderer = users => {
  return users.map(u => userFieldsRenderer(u))
}

export const userFieldsRenderer = rawUser => {
  const user = JSON.parse(JSON.stringify(rawUser))

  return user
}
