require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const ErrorHandlers = require('./middlewares/error');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(ErrorHandlers);

module.exports = app;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});