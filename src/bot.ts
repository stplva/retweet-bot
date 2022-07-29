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
			const result = await getTweetsById(ids)
			console.log(result)
		} catch (e) {
			console.log(e)
			process.exit(-1)
		}
		process.exit()
	}

	const getRecentTweets = async (query: string, days?: number) => {
		try {
			const res = await searchRecentTweetsByQuery(query, days)
			return res
		} catch (e) {
			console.log(e)
			process.exit(-1)
		}
		process.exit()
	}

	const getMostPopTweetId = (tweets: Tweet[]) => {
		console.log(`getMostPopTweetId`)
		const ratingArr: any = []

		tweets.forEach((tweet) => {
			const rating = calcRating(tweet.public_metrics, weights)
			ratingArr.push({ id: tweet.id, rating })
		})

		const max = ratingArr.reduce((acc: any, el: any) => {
			return (acc = acc > el.rating ? acc : el.rating)
		}, 0)

		if (max === 0) {
			console.log('There were no tweets worth retweeting today.')
			return
		}

		const mostPopTweet = ratingArr.find((el: any) => el.rating === max)

		console.log(ratingArr)
		console.log(`The most popular: ${mostPopTweet.id} with a rating: ${max}`)
		return mostPopTweet.id
	}

	const arr = await getRecentTweets('как же мощно')
	// const arr = response.data

	const mostPopTweetId = getMostPopTweetId(arr.data)
	retweet(mostPopTweetId)
}

Bot()