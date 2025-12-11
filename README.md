# Getting Started with Create React App

[Video](https://drive.google.com/file/d/15EfUKLZxv3tGAw-Zn0cvmwDee_blsCpN/view?usp=drive_link).

## Requirements

```
  ruby: 3.2.1
  node
  postgresql
```

## backend/database setup
The following commands will create your local development database, load the schema structure, and populate it with initial data.

```
  # 1. Create the database(s) based on database.yml
  rails db:create

  # 2. Run migrations to load the schema
  rails db:migrate
```

## backend/Credentials setup
This application uses credentials to store secret keys (e.g., API keys, secret keys, email credentials) to run.

Use command `VISUAL="code --wait" bin/rails credentials:edit` to edit rails credentials

```
  secret_key_base: XXXXXXXXXXX

  aws:
    access_key_id: XXXXXXXXXXX
    secret_access_key: XXXXXXXXXX

  elevenlabs_api_key: XXXXXXXXXX

```

## frontend setup
The following commands will install dependencies of react app

```
  npm install
```

##### backend/run
Run `rails s` from /backend directory, which runs rails server on port 3000

##### frontend/run
Run `npm start` from /frontend directory, which runs react app on port 3001.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
