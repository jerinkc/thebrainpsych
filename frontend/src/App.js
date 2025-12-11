import React, { useEffect, useState } from 'react';
import './App.css';
import { createRequest, getStatus } from './api/text-to-speech-api';

function App() {
  const [text, setText] = useState('');
  const [apiStatus, setApiStatus] = useState({ status: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleSubmit = () => {
    setIsLoading(true);
    setApiStatus({ status: 'pending', message: 'Sending...' });
    createRequest({
      text,
      onError: handleApiError,
      onSuccess: (data) => {
        setApiStatus({ status: data.status, message: 'pending' })
        setTimeout(() => fetchStatus(data.id), 2000)
      }})
  };

  const fetchStatus = (id) => {
    getStatus({
      requestId: id,
      onSuccess: (data) => {
        if( data.status === 'complete' ){
          setIsLoading(false)
          setText('')
          setApiStatus({ status: 'complete', message: '' })
          setAudioUrl(data.url)
          return null;
        }
        setTimeout(() => fetchStatus(data.id), 1000)
      },
      onError: handleApiError
    })
  }

  const handleApiError = (error) => {
    const { status, message } = error
    setApiStatus({ status, message });
  }

  const handleTextInput = (e) => {
    setText(e.target.value)
    if(apiStatus.status === 'complete') setApiStatus({ status: 'new', message: '' })
  }

  return (
    <div className="App">
      <div className="input-container">
        <h1>Text to Voice</h1>
        <textarea
          placeholder="Enter your text here..."
          value={text}
          onChange={ handleTextInput }
          disabled={isLoading}
        />
        {
          apiStatus.status === 'complete' &&
              <audio controls>
                <source
                  src={ audioUrl }
                  type="audio/mpeg"/>
                Your browser does not support the audio element.
              </audio>
        }
        {
          apiStatus.status !== 'complete' &&
            <button onClick={ handleSubmit }
              disabled={ isLoading }
            >
              { isLoading ? apiStatus.message : 'Submit' }
            </button>
        }
      </div>
    </div>
  );
}

export default App;
