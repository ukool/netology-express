const express = require('express');
const { books } = require('../store/books');
const { Book } = require('../Book');

const router = express.Router();

const findBookIndex = (id) => books.findIndex((book) => book.id === id);

router.get('/', (req, res) => {
  res.render('book/index', {
    title: 'Книги',
    books,
  });
});

router.get('/view/:id', (req, res) => {
  const index = findBookIndex(req.params.id);

  if (index === -1) {
    res.redirect('/404');
  }

  const book = books[index];
  res.render('book/view', {
    title: 'Книги',
    book,
  });
});

router.get('/update/:id', (req, res) => {
  const index = findBookIndex(req.params.id);

  if (index === -1) {
    res.redirect('/404');
  }

  const book = books[index];
  res.render('book/update', {
    title: book.title ?? 'Книга',
    book,
  });
});

router.post('/update/:id', (req, res) => {
  const index = findBookIndex(req.params.id);

  if (index === -1) {
    res.redirect('/404');
  }

  const { title, desc, authors } = req.body;

  books[index] = {
    ...books[index],
    title,
    desc,
    authors,
  };

  res.redirect(`/books/view/${req.params.id}`);
});

router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Добавить книгу',
    book: { title: '' },
  });
});

router.post('/create/', (req, res) => {
  const bookData = {
    title: req.body.title,
    desc: req.body.description,
    authors: req.body.authors,
  };

  const book = new Book(bookData);
  books.push(book);

  res.redirect(`/books/view/${book.id}`);
});

router.post('/delete/:id', (req, res) => {
  const bookIndex = findBookIndex(req.params.id);

  if (bookIndex === -1) {
    res.redirect('/404');
  }

  books.splice(bookIndex, 1);
  res.redirect('/books');
});

module.exports = {
  booksRouter: router,
};
