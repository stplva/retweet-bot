import got from 'got'
import needle from 'needle'
import { TwitterApi } from 'twitter-api-v2'

const BASE_URL = process.env.TWITTER_API_BASE_URL
const token = process.env.BEARER_TOKEN

const user_id = '958371477526663168'

const tweetEndpointURL = `${BASE_URL}/tweets?ids=`
const searchEndpointURL = `${BASE_URL}/tweets/search/recent`

// OAuth 1.0a (User context)
const userClient = new TwitterApi({
	appKey: process.env.TWITTER_API_KEY as string,
	appSecret: process.env.TWITTER_API_SECRET as string,
	accessToken: process.env.TWITTER_ACCESS_TOKEN,
	accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

export const getTweetsById = async (ids: any) => {
	console.log(`getTweetsById: ${ids}`)
	const params = {
		ids: ids,
		'tweet.fields': 'author_id,created_at,public_metrics',
		expansions: 'author_id',
		'user.fields': 'created_at',
	}

	const req = await needle('get', tweetEndpointURL, params, {
		headers: {
			'User-Agent': 'v2TweetLookupJS',
			authorization: `Bearer ${token}`,
		},
	})

	if (req.body) {
		return req.body
	} else {
		throw new Error('Unsuccessful getTweetsById request')
	}
}

export const searchRecentTweetsByQuery = async (query: any) => {
	console.log(`searchRecentTweetsByQuery: ${query}`)
	const params = {
		query: `${query} -is:retweet -has:mentions -is:quote`,
		'tweet.fields': 'author_id,public_metrics',
		start_time: new Date(
			new Date().setDate(new Date().getDate() - 1)
		).toISOString(), //get tweets for the last day
	}

	const req = await needle('get', searchEndpointURL, params, {
		headers: {
			'User-Agent': 'v2RecentSearchJS',
			authorization: `Bearer ${token}`,
		},
	})

	if (req.body) {
		return req.body
	} else {
		throw new Error('Unsuccessful searchRecentTweetsByQuery request')
	}
}

export const tweet = async (text: string, params: any) => {
	console.log(`Tweet...`)
	userClient.v1
		.tweet(text, params)
		.then((res) => {
			console.log('Tweeted!', res.id)
		})
		.catch((err) => {
			console.error(err)
		})
}

export const retweet = async (tweetId: string) => {
	console.log(`Retweeting a tweet with id ${tweetId}`)

	userClient.v2
		.retweet(user_id, tweetId)
		.then((res) => {
			console.log('Retweeted!', res.data.retweeted)
		})
		.catch((err) => {
			console.error(err)
		})
}
