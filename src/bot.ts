// environmental variables setup
import dotenv from 'dotenv'
dotenv.config()

import { getTweetsById, searchRecentTweetsByQuery } from './lib/twitter'
import { Tweet, Weights } from './lib/types'
import { calcRating } from './lib/utils'
import { response } from './tweets-hard.js'

const weights: Weights = {
	retweet_weight: 4,
	reply_weight: 3,
	like_weight: 2,
	quote_weight: 1,
}

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

const getRecentTweets = async (query: string) => {
	try {
		const res = await searchRecentTweetsByQuery(query)
		console.log(res)
	} catch (e) {
		console.log(e)
		process.exit(-1)
	}
	process.exit()
}

const getMostPopTweetId = (tweets: Tweet[]) => {
	const ratingArr: any = []

	tweets.forEach((tweet) => {
		const rating = calcRating(tweet.public_metrics, weights)
		ratingArr.push({ id: tweet.id, rating })
	})

	const max = ratingArr.reduce((acc: any, el: any) => {
		return (acc = acc > el.rating ? acc : el.rating)
	}, 0)

	const mostPopTweet = ratingArr.find((el: any) => el.rating === max)

	return mostPopTweet.id
}

// const arr = getRecentTweets('как же мощно')
const arr = response.data

const mostPopTweetId = getMostPopTweetId(arr)
const mostPopTweet = getTweet(mostPopTweetId)
console.log(mostPopTweet)