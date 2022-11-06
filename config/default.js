module.exports = {
	host: '127.0.0.1',
	port: 5000,
	serveDocument: true,
	enableClustering: false,
	fileLoggingLevel: 'all'
};

/*
	enabling clustering can negatively impact the performance for non-cpu intensive apps,
	enable only if you need more cpus to handle requests (will drastically improve performance for cpu intensive apps)
	also, clustering increases complexity and disables state sharing, this will also result in failing test cases

	read more about performance analysis here: https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html
*/
