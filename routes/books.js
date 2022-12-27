const fs = require('fs');
const express = require('express');
const { bookUploader } = require('../middleware/book-uploader');
const { books } = require('../store/books');
const { Book } = require('../Book');

const router = express.Router();

const getBookDataFromRequest = ({ body }) => ({
  title: body.title || '',
  description: body.description || '',
  authors: body.authors || '',
  favorite: body.favorite || '',
  fileCover: body.fileCover || '',
  fileName: body.fileName || '',
  fileBook: body.fileBook || '',
});

const findBookIndex = (id) => books.findIndex((book) => book.id === id);

router.get('/', (req, res) => {
  res.json(books);
});

router.post(
  '/',
  bookUploader.single('book'),
  (req, res) => {
    let fileBook = '';

    if (req.file) {
      fileBook = req.file.path;
    }

    const bookData = getBookDataFromRequest(req);
    const book = new Book(bookData);
    book.fileBook = fileBook;

    books.push(book);

    res.status(201);
    res.json(book);
  },
);

router.get('/:id', (req, res) => {
  const bookIndex = findBookIndex(req.params.id);

  if (bookIndex !== -1) {
    res.json(books[bookIndex]);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

router.put(
  '/:id',
  bookUploader.single('book'),
  async (req, res) => {
    const bookIndex = findBookIndex(req.params.id);

    if (bookIndex !== -1) {
      const bookData = getBookDataFromRequest(req);
      const book = books[bookIndex];
      let { fileBook } = book;

      if (book.fileBook && req?.file?.path) {
        fileBook = req.file.path;
        await fs.promises.unlink(book.fileBook);
      }

      bookData.fileBook = fileBook;

      books[bookIndex] = {
        ...books[bookIndex],
        ...bookData,
      };

      res.json(books[bookIndex]);
    } else {
      res.status(404);
      res.json('Книга не найдена');
    }
  },
);

router.delete('/:id', (req, res) => {
  const bookIndex = findBookIndex(req.params.id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

router.get('/:id/download', (req, res) => {
  const bookIndex = findBookIndex(req.params.id);
  if (bookIndex !== -1) {
    const book = books[bookIndex];
    res.download(book.fileBook);
  } else {
    res.status(404);
    res.json('Книга не найдена');
  }
});

module.exports = {
  booksRouter: router,
};
