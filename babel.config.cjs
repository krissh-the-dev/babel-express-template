const presets = ['@babel/preset-env'];
const plugins = [
	['@babel/transform-runtime'],
	[
		'module-resolver',
		{
			root: ['.'],
			alias: {
				'@': './src',
				'@controllers': './src/controllers',
				'@docs': './src/docs',
				'@helpers': './src/helpers',
				'@middlewares': './src/middlewares',
				'@models': './src/models',
				'@routers': './src/routers',
				'@tools': './src/tools'
			}
		}
	],
	['@babel/plugin-syntax-throw-expressions']
];

export default {
	presets,
	plugins
};
