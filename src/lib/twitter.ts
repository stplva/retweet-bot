import config from '../../twitterconfig'
import needle from 'needle'
import { TwitterClient } from 'twitter-api-client'

const twitterClient = new TwitterClient(config)

const token = process.env.BEARER_TOKEN
const tweetEndpointURL = 'https://api.twitter.com/2/tweets?ids='
const searchEndpointURL = 'https://api.twitter.com/2/tweets/search/recent'
const retweetEndpointURL = 'https://api.twitter.com/2/users/:id/retweets'

export const getTweetsById = async (ids: any) => {
	// by default, only эthe Tweet ID and text are returned
	const params = {
		ids: ids,
		'tweet.fields': 'author_id,created_at,public_metrics',
		expansions: 'author_id',
		'user.fields': 'created_at',
	}

	const res = await needle('get', tweetEndpointURL, params, {
		headers: {
			'User-Agent': 'v2TweetLookupJS',
			authorization: `Bearer ${token}`,
		},
	})

	if (res.body) {
		return res.body
	} else {
		throw new Error('Unsuccessful request')
	}
}

export const searchRecentTweetsByQuery = async (query: any) => {
	const params = {
		query: `${query} -is:retweet -has:mentions -is:quote`,
		'tweet.fields': 'author_id,public_metrics',
		start_time: new Date().setDate(new Date().getDate() - 1), //get tweets for the last day
	}

	const res = await needle('get', searchEndpointURL, params, {
		headers: {
			'User-Agent': 'v2RecentSearchJS',
			authorization: `Bearer ${token}`,
		},
	})

	if (res.body) {
		return res.body
	} else {
		throw new Error('Unsuccessful request')
	}
}
