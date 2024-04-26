# Project Name

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

A brief description of the project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Instructions on how to install and set up the project.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [React](https://reactjs.org/)

### Setup

1. Clone the repository.

```sh
git clone
```

2. Install dependencies.

```sh
cd frontend && npm install
cd ../backend && npm install
```

3. Create a `.env` file on backend root directory and add the following environment variables.

```sh
DATABASE_URL=<your-database-url>
FRONT_END_URL=<your-frontend-url>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_REDIRECT_URL=<your-google-redirect-url>
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
GITHUB_REDIRECT_URL=<your-github-redirect-url>
TOKEN_KEY=<your-token-key>
```

4. Create a `.env` file on frontend root directory and add the following environment variables.

```sh
REACT_APP_BACKEND_URL=<your-backend-url>
```

5. Start Docker.

```sh
docker-compose up
```




## Usage

GoldRush is a prominent platform in the cryptocurrency industry that offers users comprehensive information about various cryptocurrencies. Users can access real-time and historical data, rankings, portfolio tracking tools, educational resources, and curated news articles related to the cryptocurrency and blockchain landscape. In essence, GoldRush plays a pivotal role in empowering individuals and businesses to navigate and understand the dynamic world of cryptocurrencies effectively.



## License

This project is licensed under the [MIT License](LICENSE).
