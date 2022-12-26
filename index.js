const express = require('express');
const { Book } = require('./Book');
const { user } = require('./store/user');
const { books } = require('./store/books');

const app = express();
app.use(express.json());

const getBookDataFromRequest = ({ body }) => ({
  title: body.title || '',
  description: body.description || '',
  authors: body.authors || '',
  favorite: body.favorite || '',
  fileCover: body.fileCover || '',
  fileName: body.fileName || '',
});

const findBookIndex = (id) => books.findIndex((book) => book.id === id);

app.get('/api/user/login', (req, res) => {
  res.status(201);
  res.json(user);
});

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books/', (req, res) => {
  const bookData = getBookDataFromRequest(req);
  const book = new Book(bookData);

  books.push(book);

  res.status(201);
  res.json(book);
});

app.get('/api/books/:id', (req, res) => {
  const bookIndex = findBookIndex(req.params.id);

  if (bookIndex !== -1) {
    res.json(books[bookIndex]);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

app.put('/api/books/:id', (req, res) => {
  const bookIndex = findBookIndex(req.params.id);

  if (bookIndex !== -1) {
    const bookData = getBookDataFromRequest(req);

    books[bookIndex] = {
      ...books[bookIndex],
      ...bookData,
    };

    res.json(books[bookIndex]);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

app.delete('/api/books/:id', (req, res) => {
  const bookIndex = findBookIndex(req.params.id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
