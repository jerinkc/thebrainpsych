# Getting Started with Create React App

[![Demo](https://youtu.be/R_r9rWxmUBs)](https://youtu.be/R_r9rWxmUBs)

# Requirements

```
  ruby: 3.2.1
  node
  postgresql
```

# Common Issues

> ElevenLabs API Error: {"detail":{"status":"detected_unusual_activity","message":"Unusual activity detected. Free Tier usage disabled. If you are using a proxy/VPN you might need to purchase a Paid Plan to not trigger our abuse detectors. Free Tier only works if users do not abuse it, for example by creating multiple free accounts. If we notice that many people try to abuse it, we will need to reconsider Free Tier altogether. \nPlease play fair and purchase any Paid Subscription to continue."}}


If you encounter issues related to reaching the API rate limit or receive an error indicating a block when using a free-tier ElevenLabs key, please attempt the following solutions:

  1. Change Network Connection: The limit is often tied to your current IP address. Try switching your network connection (e.g., move from Wi-Fi to mobile data, or use a VPN) to obtain a new public IP.

  2. Upgrade Plan: To guarantee uninterrupted access and higher usage limits, upgrade to a paid ElevenLabs subscription plan.

# Setup

### backend/database setup
The following commands will create your local development database, load the schema structure, and populate it with initial data.

```
  # 1. Create the database(s) based on database.yml
  rails db:create

  # 2. Run migrations to load the schema
  rails db:migrate
```

### backend/Credentials setup
This application uses credentials to store secret keys (e.g., API keys, secret keys, email credentials) to run.

Use command `VISUAL="code --wait" bin/rails credentials:edit` to edit rails credentials

```
  secret_key_base: XXXXXXXXXXX

  aws:
    access_key_id: XXXXXXXXXXX
    secret_access_key: XXXXXXXXXX

  elevenlabs_api_key: XXXXXXXXXX

```

### frontend setup
The following commands will install dependencies of react app

```
  npm install
```

# Deploy App

### backend/run
Run `rails s` from /backend directory, which runs rails server on port 3000

### frontend/run
Run `npm start` from /frontend directory, which runs react app on port 3001.

Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

# Data Models & Background Jobs

### Data Models
  - **TextToSpeechRequest**: Model to store text-to-speech requests
    - **Attributes**:
      - `text`: The text content to be converted.
      - `status`: Tracking the process state (`pending`, `complete`).
    - **Attachments**:
      - `audio`: The generated audio file (via Active Storage).


### Background Jobs
  - **TextToSpeechJob**: Handles the asynchronous processing of text-to-speech conversion.
    - It utilizes `TextToSpeechService` to interact with the ElevenLabs API.
    - Upon success, it will upload the audio to AWS S3 and attach it to the `TextToSpeechRequest` model.

The frontend will poll the `TextToSpeechRequest` model for the status of the conversion. Once the conversion is complete, the frontend will get the audio file from AWS S3 and play it.
