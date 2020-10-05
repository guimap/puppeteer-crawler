# How to run
Setup the `.env` file
```
LEGENDAS_URL=
LEGENDAS_USERNAME=
LEGENDAS_PASSWORD=
MONGODB_URI=mongodb://mongo:27017
MONGODB_NAME=subtitles
```

Into `app/Dockerfile`, add the subtitle name in `ENTRYPOINT ["npm", "start", "Simpsons", "2"]`

Run `docker-compose up --build`

## Search for a specific subtitle
` npm start "Simpsons"`

## Search for a specific subtitle and with page counts

`npm start "Simpsons" 3`