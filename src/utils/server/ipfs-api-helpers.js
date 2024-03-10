import axios from 'axios'

export async function fetchDataFromIPFS(cid) {
  try {
    const response = await axios.request({
      url: 'http://35.178.146.101:80/retrieveData',
      method: 'get',
      data: { CID: cid }, // Sending body with GET request
      headers: { 'Content-Type': 'application/json' },
    })

    return response.data // This will be the JSON response from the server
  } catch (error) {
    console.error('Error fetching data from IPFS with Axios:', error)
    throw error // Rethrow the error to be handled by the caller
  }
}

export async function fetchEventsFromIPFS(publicKey, eventType) {
  try {
    const response = await axios.request({
      url: 'http://35.178.146.101:80/retrieveEvent',
      method: 'get',
      data: { Key: publicKey, Type: eventType }, // "AllEvents" or "LastEvent"
      headers: { 'Content-Type': 'application/json' },
    })

    return response.data // This will be the JSON response containing events
  } catch (error) {
    console.error('Error fetching events from IPFS with Axios:', error)
    throw error
  }
}

export async function addEventToIPFS(Key, Eventtype, Datetime, Data) {
  try {
    const response = await axios.post(
      'http://35.178.146.101:80/addEvent',
      {
        Key,
        Eventtype,
        Datetime,
        Data,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error adding event to IPFS with Axios:', error)
    throw new Error(
      `Error adding event to IPFS: ${error.response?.data || error.message}`
    )
  }
}
