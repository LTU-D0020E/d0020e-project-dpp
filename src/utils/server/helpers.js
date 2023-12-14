export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-GB', options)
}
