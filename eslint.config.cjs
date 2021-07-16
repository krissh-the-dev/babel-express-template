export default {
	env: {
		browser: false,
		node: true,
		es2021: true,
		'jest/globals': true
	},
	plugins: ['jest'],
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	rules: {
		quotes: ['warn', 'single'],
		semi: ['warn', 'always']
	}
};
