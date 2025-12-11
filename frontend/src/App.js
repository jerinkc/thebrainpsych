import { useState } from 'react';
import './App.css';
import { createRequest, getStatus } from './api/text-to-speech-api';

function App() {
  const [text, setText] = useState('');
  const [apiStatus, setApiStatus] = useState({ status: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const statusMessages = {
    'pending': 'In Queue...',
    'converting': 'Converting...',
    'uploading': 'Uploading...'
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setApiStatus({ status: 'pending' });
    createRequest({
      text,
      onError: handleApiError,
      onSuccess: (data) => {
        setApiStatus({ status: data.status })
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
          setAudioUrl(data.url)
        }

        setApiStatus({ status: data.status })
        if( data.status !== 'complete' ) setTimeout(() => fetchStatus(data.id), 1000)
      },
      onError: handleApiError
    })
  }

  const handleApiError = (error) => {
    const { status, message, errorData } = error
    setApiStatus({ status, message, errorMessage: errorData.errors });
    setIsLoading(false)
  }

  const handleTextInput = (e) => {
    setText(e.target.value)

    if(apiStatus.status === 'complete'){
      setApiStatus({ status: 'new' })
      setAudioUrl(null)
    }
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
          apiStatus.errorMessage &&
            <p className='error-message'>{ apiStatus.errorMessage }</p>
        }
        {
          (apiStatus.status === 'complete' && audioUrl) &&
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
              { isLoading ? (apiStatus.message || statusMessages[apiStatus.status]) : 'Submit' }
            </button>
        }
      </div>
    </div>
  );
}

export default App;
