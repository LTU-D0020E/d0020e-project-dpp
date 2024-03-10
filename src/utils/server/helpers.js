export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-GB', options)
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatDimensions(dimensionString) {
  // Split the string every two characters and join with 'x'
  return dimensionString.match(/.{1,2}/g).join('x')
}
