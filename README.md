# Xendit Shopping Cart Demo

This demo is a mock shopping cart store that uses Xendit checkout for invoicing and payment processing. The backend uses a simple ExpressJS server to proxy the request from client-side to the Xendit API Gateway, while the frontend uses ReactJs.

## Getting Started

### Requirements

You’ll need the following

- [Node.js](https://nodejs.org) >= `v14.12`
- [NPM](https://npmjs.org) >= `6.0.0`
- Xendit account to accept payments ([sign up](https://dashboard.xendit.co/register/1) for free). After registering, please [generate](https://dashboard.xendit.co/settings/developers#api-keys) a secret key with **MONEY-IN WRITE** permissions. You'll need this to perform requests for creating invoices.

### Running the Node Server

You need to modify the environment variables as stated in [`.env.sample`](.env.sample) to your to **.env.development**. In this case, you need to set these values:

- `process.env.REACT_APP_API_BASE_URL` -> Fake store API which I used to retrieve products
- `process.env.REACT_APP_SERVER_BASE_API_URL` -> Express Server API URl = Default is http://localhost:8080
- `process.env.REACT_APP_XENDIT_BASE_API_URL` -> Xendit API URL = https://api.xendit.co/v2

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install dependencies using yarn.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn run node`

Start the local node server powering the ExpressJs in development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

Open [http://localhost:8080/ping](http://localhost:8080/ping) to view pong output in browser to show that it is working.
