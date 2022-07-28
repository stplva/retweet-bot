import { PublicMetrics, Weights } from './types'

export const calcRating = (publicMetrics: PublicMetrics, weights: Weights) => {
	const { retweet_count, reply_count, like_count, quote_count } = publicMetrics
	const rating = 
		retweet_count * weights.retweet_weight +
		reply_count * weights.reply_weight +
		like_count * weights.like_weight +
		quote_count * weights.quote_weight
	return rating
}