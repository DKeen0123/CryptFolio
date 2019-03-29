## CryptFolio

Track your portfolio of cryptocurrencies.

*This project is still ongoing, and still very much an MVP.*

Built using Next.js, with a GraphQL Yoga server connecting to a Prisma Demo server and DB.

## Why I built this

I wanted to learn GraphQL and deepen my knowledge of Next.js, to see if I could put a full application together and use it.
I was also in need of a decent cryptocurrency portfolio tracker, as I don't really like any that I have tried.

## Things still to do

- [x] ~Deploy to production (in progress, working out some kinks)~
- [ ] Further styling of every page
- [ ] Addition of colour to the app
- [ ] nicer form handling/validation
- [ ] TESTING :grimacing: ( I rushed through without testing, as it was a small app, and for a large part I was using tutorials to get through it which did not have testing. However, I see testing as an integral part of a good application, and this is the next thing on the agenda once I have it working in production)
- [ ] Animation

## Using the application

to develop frontend:

cd to `frontend` folder.

`npm i` then `npm run dev`

go to `localhost:7777`.

to develop backend:

cd to `backend` folder.

`npm i` then `npm run dev`

for the GraphQL playground, go to `localhost:4444`

please note, you must have a db and prisma connection setup. 

You will also need a variables.env file in the backend folder, containing the following variables:

- FRONTEND_URL (url for the frontend, default is http://localhost:7777)
- PRISMA_ENDPOINT (endpoint of the prisma server)
- PRISMA_SECRET (make up a string)
- APP_SECRET (make up a string)
- PORT (default in the app is 4444)
