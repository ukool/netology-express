const express = require('express');
const { booksRouter } = require('./routes/books');
const { error404 } = require('./middleware/error');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/public', express.static(`${__dirname}/public`));

app.use('/books', booksRouter);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
