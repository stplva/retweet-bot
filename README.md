# retweet-bot

This is a Twitter bot that searches for the most popular tweet
from Recent tweets by user query and retweets it.

Be careful with what you type! ;)

## How to Run it

### 1. Environment variables

Create a `.env` file from `.env.tempate`

```sh
cp .env.template .env
```

Add the appropriate values, these can be found in your 
Twitter Developer Portal > App settings > Keys and tokens.

You can keep the default value of `TWITTER_API_BASE_URL`,
or change it.

### 2. Run the bot

```sh
npm start
```
