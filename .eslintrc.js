module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['plugin:node/recommended', 'plugin:@typescript-eslint/recommended'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {
		'no-unused-vars': 'warn',
		'no-explicit-any': 'no',
	},
}
