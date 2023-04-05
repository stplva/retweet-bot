// environmental variables setup
require('dotenv').config()

import {
	getTweetsById,
	retweet,
	searchRecentTweetsByQuery,
} from './lib/twitter'
import { Tweet, Weights } from './lib/types'
import { calcRating } from './lib/utils'
import { response } from './tweets-hard.js'

const weights: Weights = {
	retweet_weight: 4,
	reply_weight: 3,
	quote_weight: 2,
	like_weight: 1,
}

export const Bot = async () => {
	console.log('Bot started...')

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

	let recentTweets: { data: any[] } = { data: [] }

	try {
		recentTweets = await getRecentTweets('как же мощно')
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