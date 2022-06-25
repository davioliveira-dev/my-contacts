require('express-async-errors');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, req, res, _) => {
	console.error('Error handler', error);
	return res.sendStatus(500);
});

app.listen(9000, () => {
	console.log('Server is running on port 9000');
});
