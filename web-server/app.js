const express = require('express');
const client = require('prom-client');
const health = require('@cloudnative/health-connect');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timestamps: false });

let healthCheck = new health.HealthChecker();

app.use('/', express.static(__dirname + '/src'));

app.use('/ready', health.ReadinessEndpoint(healthCheck));
app.use('/health', health.HealthEndpoint(healthCheck));


app.get('/metrics', (req, res) => {
	res.status(200).set('Content-Type', 'text/plain');
	res.end(client.register.metrics());
});


const server = app.listen(80, () => {
	console.log('SERVER STARTED');
});

// catch handler SIGINT (Ctrl+C)
process.on('SIGINT', () => {
	console.log('SIGINT received.');
	server.close(() => {
		console.log('Closing HTTP server')
	});
});
