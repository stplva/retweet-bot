export interface Tweet {
	id: string
	text: string
	public_metrics: PublicMetrics
	author_id?: string
}

export interface PublicMetrics {
	retweet_count: number
	reply_count: number
	like_count: number
	quote_count: number
}

export interface Weights {
	retweet_weight: number
	reply_weight: number
	like_weight: number
	quote_weight: number
}