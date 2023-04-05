// environmental variables setup
require('dotenv').config()
const prompt = require("prompt-sync")()

import {
	getTweetsById,
	retweet,
	searchRecentTweetsByQuery,
} from './lib/twitter'
import { Tweet, Weights } from './lib/types'
import { calcRating } from './lib/utils'

const weights: Weights = {
	retweet_weight: 4,
	reply_weight: 3,
	quote_weight: 2,
	like_weight: 1,
}


const getTweet = async (ids: any) => {
	try {
		const res = await getTweetsById(ids)
		console.log(res)
		return res
	} catch (e) {
		console.log(e)
		process.exit(-1)
	}
}

const getRecentTweets = async (query: string, days?: number) => {
	try {
		const res = await searchRecentTweetsByQuery(query, days)
		return res
	} catch (e) {
		console.log(e)
		process.exit(-1)
	}
}

const getMostPopTweetId = (tweets: Tweet[] | undefined) => {
	console.log(`getMostPopTweetId`)

	if (!tweets) {
		console.log('getMostPopTweetId: tweets are undefined', tweets)
		return
	}

	const ratingArr = tweets.map((tweet) => {
		const rating = calcRating(tweet.public_metrics, weights)
		return { id: tweet.id, rating }
	})

	const maxRating = ratingArr.reduce((acc: any, el: any) => {
		return (acc = acc > el.rating ? acc : el.rating)
	}, 0)

	if (maxRating === 0) {
		console.log('There were no tweets worth retweeting today.')
		return
	}

	const mostPopTweet = ratingArr.find((el) => el.rating === maxRating)

	console.log(ratingArr)
	console.log(`The most popular tweet: ${mostPopTweet?.id} with a rating: ${maxRating}`)
	return mostPopTweet?.id
}

export const Bot = async () => {
	console.log('Bot started...')

	let query = 
		prompt('Enter query to search and retweet the most popular tweet with it:') 
		|| 'как же мощно'
	let recentTweets: { data: any[] } = { data: [] }

	try {
		recentTweets = await getRecentTweets(query)
	} catch (e) {
		console.log(e)
	}

	const mostPopTweetId = getMostPopTweetId(recentTweets?.data)
	try {
		await retweet(mostPopTweetId)
	} catch (e) {
		console.log(e)
		process.exit(-1)
	}
}

Bot()