# ParkMate

Welcome to **ParkMate**, the final project submission by:

- **Andrada, Chad Denard**
- **Millan, Jeff Andre**
- **Tejada, Ian Clyde**

ParkMate simplifies your parking experience with a **user-friendly** app. Quickly **locate** available parking locations and **reserve** parking slots. Our app calculates **payments** based on the base rate and the hourly rate of its respective parking location. ParkMate provides a **transaction history**, making your payments convenient and organized.

Say goodbye to parking hassles – ParkMate is your reliable companion for **stress-free** parking.

## Getting Started

This is for developers wanting to reproduce the web app functionalities on their local machine. As much as possible, try to follow all the steps below in order.

## Install dependencies

To begin, install the dependencies in the root folder!

```bash
npm install
```

## Setting up the local database

After installing the dependencies, create a .env file in the root directory (It should be on the same level as the readme.md and package.json)

Inside the .env, paste the database URL which is structured as follows:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Refer to the [official Prisma ORM documentation](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-url) for more info.

After the URL has been properly set up, run the Prisma migration script to migrate the tables and perform database seeding:

```bash
npx prisma migrate dev
```

## Admin Credentials

All users that sign up will be REGULAR users. Only the developers have the privilege to grant ADMIN access. For requirement purposes, we have provided a free account with admin access.

```bash
username: parkmate-admin
password: FREEadmin-access
```

## Start development server

After installing dependencies and setting up the database, run this command on the root directory:

```bash
npm run dev
```

Visit http://localhost:3000 to check it out! Log in with the Admin Account or sign up to check out regular user features.

## Perform the tests using Jest

ParkMate uses [Jest](https://jestjs.io/) as its Testing Framework. [Selenium](https://www.selenium.dev/) is also used to automate some functionalities. For the API testing, ParkMate uses the [next-test-api-route-handler (NTARH)](https://github.com/Xunnamius/next-test-api-route-handler) testing library. Run this command on root directory to run the tests:

```bash
npm test
```

## Sidenotes by the developers

#### Noticed in testing

Always <code>use waitFor(() => {})</code> when trying to test a server component. Don't be like me! and always mock functions that has async ()!

#### Github desktop errors encountered

Fixed my issues related to husky

```bash
git config --unset core.hooksPath
```

<code>
/bin/bash: C:/Program Files/nodejs/npx: No such file or directory husky - pre-commit script failed (code 127)
</code>