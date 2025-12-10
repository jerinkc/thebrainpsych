import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:3000/text_to_speech/get_voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { voice_request: { text } }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTimeout(fetchStatus, 1000)
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus(`Error: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting text:', error);
      setStatus('Failed to connect to the server.');
    }
  };

  async function fetchStatus() {
    try {
      const response = await fetch('http://localhost:3000/text_to_speech/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { voice_request: { text } }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTimeout(fetchStatus, 1000)
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus(`Error: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting text:', error);
      setStatus('Failed to connect to the server.');
    }
  }

  return (
    <div className="App">
      <div className="input-container">
        <h1>Text to Voice</h1>
        <textarea
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={ handleSubmit }
          disabled={ isLoading || !text.trim() }
        >
          { isLoading ? status : 'Submit' }
        </button>
      </div>
    </div>
  );
}

export default App;
