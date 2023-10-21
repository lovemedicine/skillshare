# Skillshare App

An app built with Next.js and Prisma that allows people to share their skills.


## Requirements

- npm
- nodejs
- sqlite


## Getting Started

First install package dependencies:

```
npm install
```

Then create the database, load the schema and seed data, and create the prisma client:

```bash
npx prisma db push
npx prisma db seed
npx prisma generate
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the skillshare app.


## TODO

- automated testing
- better error handling
- style improvements
- caching
