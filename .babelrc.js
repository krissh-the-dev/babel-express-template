const path = require('path');
const fs = require('fs');
const jsConfig = require('./jsconfig.json');

const srcDir = fs.readdirSync(path.resolve(__dirname, './src'));
let sourceFoldersAliases = {};
for (let file of srcDir) {
	const filePath = path.resolve(__dirname, './src', file);
	if (fs.statSync(filePath).isDirectory())
		sourceFoldersAliases = { ...sourceFoldersAliases, [`@${file}`]: filePath };
}

module.exports = {
	presets: ['@babel/preset-env'],
	plugins: [
		['@babel/transform-runtime'],
		[
			'module-resolver',
			{
				root: path.resolve(jsConfig.compilerOptions.baseUrl),
				alias: sourceFoldersAliases
			}
		],
		['@babel/plugin-syntax-throw-expressions']
	]
};
