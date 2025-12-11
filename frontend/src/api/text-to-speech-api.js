const SERVER_BASE_URL = `http://localhost:3000//text_to_speech`

export async function getStatus({ requestId, onSuccess, onError }){
  try {
    const response = await fetch(`${SERVER_BASE_URL}/${requestId}/status`);

    if (response.ok) {
      const data = await response.json();
      onSuccess(data)
    } else {
      const errorData = await response.json();
      onError({ status: 'error', message: `Error: ${errorData.message || response.statusText}`, errorData })
    }
  } catch (error) {
    console.error('Error submitting text:', error);
    onError({ status: 'error', message: 'Failed to connect to the server.', errorData: error })
  }
}

export async function createRequest({ text, onSuccess, onError }){
  try {
    const response = await fetch(`${SERVER_BASE_URL}/get_voice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { voice_request: { text } }),
    });

    if (response.ok) {
      const data = await response.json();
      onSuccess(data)
    } else {
      const errorData = await response.json()
      onError({ status: 'error', message: `Error: ${errorData.message || response.statusText}`, errorData })
    }
  } catch (error) {
    console.error('Error submitting text:', error);
    onError({ status: 'error', message: 'Failed to connect to the server.', errorData: error })
  }
}
